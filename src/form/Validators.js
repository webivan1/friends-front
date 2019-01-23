import is from 'is_js'

export function isRequired(value) {
  return !is.empty(value);
}

export function isBoolean(value) {
  return is.boolean(value);
}

export function confirm(control) {
  return (value, form) => form.control(control).getValue() === value;
}

export function isNumber(value) {
  return !!String(value).match(/^\d+$/)
}

export function isFloat(value) {
  return !!String(value).match(/^\d+(\.\d+)?$/)
}

export function min(min) {
  return (value, form) => (isNumber(value) || isFloat(value)) && +value >= min
}

export function max(max) {
  return (value, form) => (isNumber(value) || isFloat(value)) && +value <= max
}

export function minLength(min) {
  return (value, form) => String(value).length >= min
}

export function maxLength(max) {
  return (value, form) => String(value).length <= max
}

export function isEmail(value) {
  return is.email(value)
}