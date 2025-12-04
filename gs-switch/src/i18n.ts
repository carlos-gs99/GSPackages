import type { i18n } from 'i18next';
import enTranslations from './i18n/en.json';
import ptTranslations from './i18n/pt.json';

export const GS_SWITCH_NAMESPACE = 'gs-switch';

let isRegistered = false;

export const registerGSSwitchI18n = (i18nInstance: i18n) => {
  if (isRegistered) return;

  i18nInstance.addResourceBundle('en', GS_SWITCH_NAMESPACE, enTranslations, true, true);
  i18nInstance.addResourceBundle('pt', GS_SWITCH_NAMESPACE, ptTranslations, true, true);

  isRegistered = true;
};

