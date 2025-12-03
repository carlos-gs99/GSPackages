import type { i18n } from 'i18next';
import en from './i18n/en.json';
import pt from './i18n/pt.json';

export const GS_TOAST_NAMESPACE = 'gstoast';

export function registerGSToastI18n(instance: i18n) {
  if (!instance.hasResourceBundle('en', GS_TOAST_NAMESPACE)) {
    instance.addResourceBundle('en', GS_TOAST_NAMESPACE, en);
  }
  if (!instance.hasResourceBundle('pt', GS_TOAST_NAMESPACE)) {
    instance.addResourceBundle('pt', GS_TOAST_NAMESPACE, pt);
  }
}

