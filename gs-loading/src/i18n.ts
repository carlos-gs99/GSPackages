import type { i18n } from 'i18next';
import en from './i18n/en.json';
import pt from './i18n/pt.json';

export const GS_LOADING_NAMESPACE = 'gs-loading';

export function registerGSLoadingI18n(instance: i18n) {
  if (!instance.hasResourceBundle('en', GS_LOADING_NAMESPACE)) {
    instance.addResourceBundle('en', GS_LOADING_NAMESPACE, en);
  }
  if (!instance.hasResourceBundle('pt', GS_LOADING_NAMESPACE)) {
    instance.addResourceBundle('pt', GS_LOADING_NAMESPACE, pt);
  }
}

