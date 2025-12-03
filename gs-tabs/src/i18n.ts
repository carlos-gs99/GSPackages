import type { i18n } from 'i18next';
import en from './i18n/en.json';
import pt from './i18n/pt.json';

export const GS_TABS_NAMESPACE = 'gstabs';

export function registerGSTabsI18n(instance: i18n) {
  if (!instance.hasResourceBundle('en', GS_TABS_NAMESPACE)) {
    instance.addResourceBundle('en', GS_TABS_NAMESPACE, en);
  }
  if (!instance.hasResourceBundle('pt', GS_TABS_NAMESPACE)) {
    instance.addResourceBundle('pt', GS_TABS_NAMESPACE, pt);
  }
}

