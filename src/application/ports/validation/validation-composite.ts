/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class ValidationComposite<T = unknown> {
  protected validations: ValidationComposite[] = [];

  abstract validate(args: T): Promise<void> | never;

  add(...validations: ValidationComposite[]) {
    validations.forEach((validation) => {
      this.validations.push(validation);
    });
  }
}
