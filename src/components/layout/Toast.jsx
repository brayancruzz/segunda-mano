import { sileo } from "sileo";

export function success(title, description) {
  sileo.success({ title, description });
}

export function error(title, description) {
  sileo.error({ title, description });
}

export function warning(title, description) {
  sileo.warning({ title, description });
}

export function info(title, description) {
  sileo.info({ title, description });
}