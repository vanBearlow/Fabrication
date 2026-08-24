export interface FieldMetadata {
  type: 'uuid' | 'text' | 'boolean' | 'date' | 'integer' | 'json';
  primaryKey?: boolean;
  nullable?: boolean;
  default?: any;
}

export interface EntityMetadata {
  name: string;
  tableName: string;
  fields: Record<string, FieldMetadata>;
}

const entityRegistry = new Map<string, EntityMetadata>();

function getOrCreateEntity(className: string): EntityMetadata {
  let meta = entityRegistry.get(className);
  if (!meta) {
    meta = {
      name: className,
      tableName: className.toLowerCase() + 's',
      fields: {}
    };
    entityRegistry.set(className, meta);
  }
  return meta;
}

export function entity(options?: { name?: string; tableName?: string }) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    const className = constructor.name;
    const name = options?.name || className;
    const tableName = options?.tableName || className.toLowerCase() + 's';

    const existing = getOrCreateEntity(className);
    existing.name = name;
    existing.tableName = tableName;
    entityRegistry.set(className, existing);
    return constructor;
  };
}

export function uuid(options?: { primaryKey?: boolean }) {
  return function (target: any, propertyKey: string | symbol) {
    const className = target.constructor.name;
    const existing = getOrCreateEntity(className);
    existing.fields[String(propertyKey)] = {
      type: 'uuid',
      primaryKey: options?.primaryKey ?? false
    };
  };
}

export function text(options?: { nullable?: boolean }) {
  return function (target: any, propertyKey: string | symbol) {
    const className = target.constructor.name;
    const existing = getOrCreateEntity(className);
    existing.fields[String(propertyKey)] = {
      type: 'text',
      nullable: options?.nullable ?? false
    };
  };
}

export function boolean(options?: { nullable?: boolean; default?: boolean }) {
  return function (target: any, propertyKey: string | symbol) {
    const className = target.constructor.name;
    const existing = getOrCreateEntity(className);
    existing.fields[String(propertyKey)] = {
      type: 'boolean',
      nullable: options?.nullable ?? false,
      default: options?.default
    };
  };
}

export function date(options?: { nullable?: boolean }) {
  return function (target: any, propertyKey: string | symbol) {
    const className = target.constructor.name;
    const existing = getOrCreateEntity(className);
    existing.fields[String(propertyKey)] = {
      type: 'date',
      nullable: options?.nullable ?? false
    };
  };
}

export function getEntityRegistry(): Map<string, EntityMetadata> {
  return entityRegistry;
}
