export class BaseEventModel<T = Record<string, any>> {
  type: string;
  data: T;

  constructor(model?: Partial<T>) {
    this.data = {
      ...(model as T),
    };
  }
}
