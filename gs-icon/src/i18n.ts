import type { i18n } from 'i18next';
import en from './i18n/en.json';
import pt from './i18n/pt.json';

export const GS_ICON_NAMESPACE = 'gsicon';

export function registerGSIconI18n(instance: i18n) {
  try {
    instance.addResourceBundle('en', GS_ICON_NAMESPACE, en as any, true, true);
    instance.addResourceBundle('pt', GS_ICON_NAMESPACE, pt as any, true, true);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[GSIcon] Failed to register translations', error);
    }
  }
}
