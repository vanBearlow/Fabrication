import { entity, uuid, text, boolean, date } from '../decorators.ts';
import type { ConfidenceLevel, DomainKey, MisconceptionType } from '../../types/scenario.ts';

@entity({ name: 'Attempt', tableName: 'fabric_triage_attempts' })
export class AttemptEntity {
  @uuid({ primaryKey: true })
  id!: string;

  @text()
  user_id!: string;

  @text()
  scenarioSlug!: string;

  @text()
  domain!: DomainKey;

  @text()
  selectedChoiceId!: string;

  @boolean()
  correct!: boolean;

  @text()
  confidence!: ConfidenceLevel;

  @text()
  misconceptionType!: MisconceptionType;

  @date()
  attemptedAt!: string;
}
