export abstract class ValidationComposite {
  protected validations: ValidationComposite[] = [];

  abstract validate<T>(args: T): Promise<void | never>;

  add(...validations: ValidationComposite[]) {
    validations.forEach((validation) => {
      this.validations.push(validation);
    });
  }
}
