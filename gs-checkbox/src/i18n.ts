import type { i18n } from 'i18next';
import en from './i18n/en.json';
import pt from './i18n/pt.json';

export const GS_CHECKBOX_NAMESPACE = 'gscheckbox';

export function registerGSCheckboxI18n(instance: i18n) {
  if (!instance.hasResourceBundle('en', GS_CHECKBOX_NAMESPACE)) {
    instance.addResourceBundle('en', GS_CHECKBOX_NAMESPACE, en);
  }
  if (!instance.hasResourceBundle('pt', GS_CHECKBOX_NAMESPACE)) {
    instance.addResourceBundle('pt', GS_CHECKBOX_NAMESPACE, pt);
  }
}

