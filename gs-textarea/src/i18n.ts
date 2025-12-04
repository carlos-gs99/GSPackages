import type { i18n } from 'i18next';
import enTranslations from './i18n/en.json';
import ptTranslations from './i18n/pt.json';

export const GS_TEXTAREA_NAMESPACE = 'gs-textarea';

let isRegistered = false;

export const registerGSTextAreaI18n = (i18nInstance: i18n) => {
  if (isRegistered) return;

  i18nInstance.addResourceBundle('en', GS_TEXTAREA_NAMESPACE, enTranslations, true, true);
  i18nInstance.addResourceBundle('pt', GS_TEXTAREA_NAMESPACE, ptTranslations, true, true);

  isRegistered = true;
};

