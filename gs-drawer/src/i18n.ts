import type { i18n } from 'i18next';
import en from './i18n/en.json';
import pt from './i18n/pt.json';

export const GS_DRAWER_NAMESPACE = 'gs-drawer';
let isRegistered = false;

export const registerGSDrawerI18n = (i18nInstance: i18n) => {
  if (isRegistered) return;
  i18nInstance.addResourceBundle('en', GS_DRAWER_NAMESPACE, en, true, true);
  i18nInstance.addResourceBundle('pt', GS_DRAWER_NAMESPACE, pt, true, true);
  isRegistered = true;
};

