import type { i18n } from 'i18next';
import en from './i18n/en.json';
import pt from './i18n/pt.json';

export const GS_MODAL_NAMESPACE = 'gsmodal';

export function registerGSModalI18n(instance: i18n) {
  if (!instance.hasResourceBundle('en', GS_MODAL_NAMESPACE)) {
    instance.addResourceBundle('en', GS_MODAL_NAMESPACE, en);
  }
  if (!instance.hasResourceBundle('pt', GS_MODAL_NAMESPACE)) {
    instance.addResourceBundle('pt', GS_MODAL_NAMESPACE, pt);
  }
}

