type Params = Record<string, any>;

export function cleanParams<T extends Params>(params: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== null && v !== undefined),
  ) as Partial<T>;
}
