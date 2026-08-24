import type { Attempt, UserClaims } from '../types/attempt.ts';
import type { ConfidenceLevel, DomainKey, MisconceptionType } from '../types/scenario.ts';

const LOCAL_STORAGE_KEY = 'fabric_triage_attempts_v1';
const LOCAL_USER_STORAGE_KEY = 'fabric_triage_user_v1';

const DEFAULT_USER: UserClaims = {
  id: 'usr-vanberlo-analyst-001',
  name: 'Alex Rivera',
  email: 'alex.rivera@vanberlo.dev',
  tenantId: 'tenant-vanberlo-fabric-corp',
  roles: ['FabricAnalyticsEngineer', 'VanBerloOnCall']
};

export interface BackendStatus {
  mode: 'rayfin_fabric' | 'local_fallback';
  authenticated: boolean;
  endpoint?: string;
  userName: string;
  userEmail: string;
}

class RayfinClient {
  private endpoint: string | null = null;
  private token: string | null = null;
  private currentUser: UserClaims = DEFAULT_USER;

  constructor() {
    this.initEnvironment();
  }

  private initEnvironment() {
    const envEndpoint = (import.meta as any).env?.VITE_RAYFIN_GRAPHQL_ENDPOINT;
    if (envEndpoint) {
      this.endpoint = envEndpoint;
    }

    try {
      const storedUser = localStorage.getItem(LOCAL_USER_STORAGE_KEY);
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    } catch {
    }
  }

  public getStatus(): BackendStatus {
    return {
      mode: this.endpoint && this.token ? 'rayfin_fabric' : 'local_fallback',
      authenticated: true,
      endpoint: this.endpoint || 'Local Resilience Mode (LocalStorage)',
      userName: this.currentUser.name,
      userEmail: this.currentUser.email
    };
  }

  public getUserClaims(): UserClaims {
    return this.currentUser;
  }

  public setUserClaims(user: UserClaims): void {
    this.currentUser = user;
    try {
      localStorage.setItem(LOCAL_USER_STORAGE_KEY, JSON.stringify(user));
    } catch {
    }
  }

  public async getMyAttempts(): Promise<Attempt[]> {
    if (this.endpoint && this.token) {
      try {
        const query = `
          query GetMyAttempts {
            myAttempts {
              id
              user_id
              scenarioSlug
              domain
              selectedChoiceId
              correct
              confidence
              misconceptionType
              attemptedAt
            }
          }
        `;
        const res = await fetch(this.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
          body: JSON.stringify({ query })
        });
        const data = await res.json();
        if (data?.data?.myAttempts) {
          return data.data.myAttempts;
        }
      } catch (err) {
        console.warn('Rayfin backend query failed, falling back to local storage cache', err);
      }
    }

    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!raw) return [];
      const parsed: Attempt[] = JSON.parse(raw);
      return parsed.filter(a => a.user_id === this.currentUser.id);
    } catch (err) {
      console.error('Failed reading local storage attempts', err);
      return [];
    }
  }

  public async recordAttempt(payload: {
    scenarioSlug: string;
    domain: DomainKey;
    selectedChoiceId: string;
    correct: boolean;
    confidence: ConfidenceLevel;
    misconceptionType: MisconceptionType;
  }): Promise<Attempt> {
    const attempt: Attempt = {
      id: `att-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      user_id: this.currentUser.id,
      scenarioSlug: payload.scenarioSlug,
      domain: payload.domain,
      selectedChoiceId: payload.selectedChoiceId,
      correct: payload.correct,
      confidence: payload.confidence,
      misconceptionType: payload.misconceptionType,
      attemptedAt: new Date().toISOString()
    };

    if (this.endpoint && this.token) {
      try {
        const mutation = `
          mutation RecordAttempt($input: CreateAttemptInput!) {
            recordAttempt(input: $input) {
              id
              user_id
              scenarioSlug
              domain
              selectedChoiceId
              correct
              confidence
              misconceptionType
              attemptedAt
            }
          }
        `;
        const res = await fetch(this.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
          body: JSON.stringify({
            query: mutation,
            variables: { input: attempt }
          })
        });
        const data = await res.json();
        if (data?.data?.recordAttempt) {
          this.saveToLocalCache(attempt);
          return data.data.recordAttempt;
        }
      } catch (err) {
        console.warn('Rayfin mutation failed, persisting locally', err);
      }
    }

    this.saveToLocalCache(attempt);
    return attempt;
  }

  private saveToLocalCache(attempt: Attempt): void {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      const list: Attempt[] = raw ? JSON.parse(raw) : [];
      list.push(attempt);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
      console.error('Failed saving to localStorage', err);
    }
  }

  public async clearMyAttempts(): Promise<boolean> {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const list: Attempt[] = JSON.parse(raw);
        const filtered = list.filter(a => a.user_id !== this.currentUser.id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
      }
      return true;
    } catch {
      return false;
    }
  }
}

export const rayfinClient = new RayfinClient();
