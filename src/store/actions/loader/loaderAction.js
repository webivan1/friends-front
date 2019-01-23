import { LOADER_ON, LOADER_OFF } from "../actionTypes";

export function loaderOn() {
  return { type: LOADER_ON }
}

export function loaderOff() {
  return { type: LOADER_OFF }
}