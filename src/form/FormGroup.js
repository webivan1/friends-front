import FormControl from './FormControl'

export default class FormGroup {

  controls = {};

  constructor(controls) {
    Object.keys(controls).forEach(name => {
      const control = controls[name];
      control.setName(name);
      this.controls[control.getName()] = control;
    });
  }

  /**
   * @return FormControl|null
   */
  control(name) {
    return this.controls[name] || null;
  }

  setValue(controlName, value) {
    const control = this.control(controlName);

    if (!control) {
      throw new Error(`Control ${controlName} in not found`);
    }

    control.setValue(value, this);
    return this;
  }

  update(callable) {
    callable(this.clone());
  }

  /** @return FormGroup */
  clone() {
    return Object.assign(Object.create(this), this);
  }

  each(callable) {
    Object.keys(this.controls)
      .forEach(key => callable(key, this.controls[key]));
  }

  validate() {
    this.each((controlName, control) => control.validate(this));
    return this.isValid();
  }

  isValid() {
    let isValid = true;
    this.each((controlName, control) => isValid = isValid && control.valid);
    return isValid;
  }

  getValues() {
    let values = {};
    this.each((controlName, control) => values[controlName] = control.getValue());
    return values;
  }
}