import type { i18n } from 'i18next';
import en from './i18n/en.json';
import pt from './i18n/pt.json';

export const GS_ALERT_NAMESPACE = 'gsalert';

export function registerGSAlertI18n(instance: i18n) {
  if (!instance.hasResourceBundle('en', GS_ALERT_NAMESPACE)) {
    instance.addResourceBundle('en', GS_ALERT_NAMESPACE, en);
  }
  if (!instance.hasResourceBundle('pt', GS_ALERT_NAMESPACE)) {
    instance.addResourceBundle('pt', GS_ALERT_NAMESPACE, pt);
  }
}

