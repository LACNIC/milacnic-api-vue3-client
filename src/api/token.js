import { RESOURCES, TOKEN, ORGID } from "../utils/constants";

export function setTokenApi(token) {
  localStorage.setItem(TOKEN, token);
}

export function getTokenApi() {
  return localStorage.getItem(TOKEN);
}

export function deleteTokenApi() {
  return localStorage.removeItem(TOKEN);
}

export function setResources(token) {
  localStorage.setItem(RESOURCES, token);
}

export function getResources() {
  return localStorage.getItem(RESOURCES);
}

export function deleteResources() {
  return localStorage.removeItem(RESOURCES);
}
export function setOrgId(token) {
  localStorage.setItem(ORGID, token);
}

export function getOrgId() {
  return localStorage.getItem(ORGID);
}

export function deleteOrgId() {
  return localStorage.removeItem(ORGID);
}