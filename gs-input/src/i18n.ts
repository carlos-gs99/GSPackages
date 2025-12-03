import type { i18n } from 'i18next';
import en from './i18n/en.json';
import pt from './i18n/pt.json';

export const GS_INPUT_NAMESPACE = 'gsinput';

export function registerGSInputI18n(instance: i18n) {
  if (!instance.hasResourceBundle('en', GS_INPUT_NAMESPACE)) {
    instance.addResourceBundle('en', GS_INPUT_NAMESPACE, en);
  }
  if (!instance.hasResourceBundle('pt', GS_INPUT_NAMESPACE)) {
    instance.addResourceBundle('pt', GS_INPUT_NAMESPACE, pt);
  }
}

