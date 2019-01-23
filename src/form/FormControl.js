import is from 'is_js';
import { isRequired } from "./Validators";

const isEmpty = value => is.empty(value);

export default class FormControl {

  valid = true;
  name = null;

  /*
   * @param String defaultValue
   * @param Function[] rules
   */
  constructor(defaultValue, rules) {
    this.value = String(defaultValue || '');
    this.rules = rules.sort(FormControl.sortRules);
  }

  getValue() {
    return this.value;
  }

  setValue(value, form) {
    this.value = value;
    this.validate(form);
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  getRules() {
    return this.rules;
  }

  validate(form) {
    this.valid = true;

    const firstRule = this.getRules().slice(0, 1)[0] || null;

    if (firstRule && firstRule.name !== isRequired.name && isEmpty(this.getValue())) {
      this.valid = true;
    } else {
      this.getRules().forEach(rule => {
        this.valid = rule(this.getValue(), form) && this.valid;
      });
    }

    return this.valid;
  }

  static sortRules(fn1, fn2) {
    if (fn1.name === isRequired.name) {
      return -1;
    } else if (fn2.name === isRequired.name) {
      return 1;
    } else {
      return 0;
    }
  }
}