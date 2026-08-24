import { getEntityRegistry } from './decorators.ts';
import './entities/Attempt.ts';

export interface RayfinSchemaConfig {
  version: string;
  appName: string;
  authentication: {
    provider: 'microsoft_entra_sso' | 'fabric_token';
    roleClaim: string;
    userClaim: string;
  };
  entities: Record<string, any>;
  permissions: {
    authenticatedUsers: {
      read: boolean;
      create: boolean;
      update: boolean;
      delete: boolean;
      filterByClaim: string;
    };
  };
}

export const rayfinSchema: RayfinSchemaConfig = {
  version: '1.0.0',
  appName: 'fabric-triage',
  authentication: {
    provider: 'microsoft_entra_sso',
    roleClaim: 'roles',
    userClaim: 'oid'
  },
  entities: Object.fromEntries(getEntityRegistry().entries()),
  permissions: {
    authenticatedUsers: {
      read: true,
      create: true,
      update: false,
      delete: false,
      filterByClaim: 'user_id'
    }
  }
};

export const graphQLTypeDefs = `
  enum DomainKey {
    prepare_data
    maintain_analytics
    semantic_models
  }

  enum ConfidenceLevel {
    guessing
    fairly_sure
    confident
  }

  enum MisconceptionType {
    dangerous_misconception
    needs_review
    knowledge_gap
    strong_signal
    lucky_hit
    solid_understanding
  }

  type Attempt {
    id: ID!
    user_id: String!
    scenarioSlug: String!
    domain: DomainKey!
    selectedChoiceId: String!
    correct: Boolean!
    confidence: ConfidenceLevel!
    misconceptionType: MisconceptionType!
    attemptedAt: String!
  }

  input CreateAttemptInput {
    id: ID
    scenarioSlug: String!
    domain: DomainKey!
    selectedChoiceId: String!
    correct: Boolean!
    confidence: ConfidenceLevel!
    misconceptionType: MisconceptionType!
  }

  type Query {
    myAttempts: [Attempt!]!
    attemptBySlug(slug: String!): Attempt
  }

  type Mutation {
    recordAttempt(input: CreateAttemptInput!): Attempt!
    clearMyAttempts: Boolean!
  }
`;
