import type { i18n } from 'i18next';
import en from './i18n/en.json';
import pt from './i18n/pt.json';

export const GS_SPINNER_NAMESPACE = 'gsspinner';

export function registerGSSpinnerI18n(instance: i18n) {
  if (!instance.hasResourceBundle('en', GS_SPINNER_NAMESPACE)) {
    instance.addResourceBundle('en', GS_SPINNER_NAMESPACE, en);
  }
  if (!instance.hasResourceBundle('pt', GS_SPINNER_NAMESPACE)) {
    instance.addResourceBundle('pt', GS_SPINNER_NAMESPACE, pt);
  }
}

