import {
  entity,
  role,
  text,
  boolean,
  date,
  uuid,
} from '@microsoft/rayfin-core';

@entity()
@role('authenticated', '*', {
  policy: (claims, item) => claims.sub.eq(item.user_id),
})
export class Attempt {
  @uuid() id!: string;
  @text() user_id!: string;
  @text() scenarioSlug!: string;
  @text() domain!: string;
  @text() selectedChoiceId!: string;
  @boolean() correct!: boolean;
  @text() confidence!: string;
  @text() misconceptionType!: string;
  @date() attemptedAt!: Date;
}
