import type { i18n } from 'i18next';
import en from './i18n/en.json';
import pt from './i18n/pt.json';

export const GS_LABEL_NAMESPACE = 'gslabel';

export function registerGSLabelI18n(instance: i18n) {
  if (!instance.hasResourceBundle('en', GS_LABEL_NAMESPACE)) {
    instance.addResourceBundle('en', GS_LABEL_NAMESPACE, en);
  }
  if (!instance.hasResourceBundle('pt', GS_LABEL_NAMESPACE)) {
    instance.addResourceBundle('pt', GS_LABEL_NAMESPACE, pt);
  }
}

