import type { i18n } from 'i18next';
import en from './i18n/en.json';
import pt from './i18n/pt.json';

export const GS_CHIP_NAMESPACE = 'gschip';

export function registerGSChipI18n(instance: i18n) {
  if (!instance.hasResourceBundle('en', GS_CHIP_NAMESPACE)) {
    instance.addResourceBundle('en', GS_CHIP_NAMESPACE, en);
  }
  if (!instance.hasResourceBundle('pt', GS_CHIP_NAMESPACE)) {
    instance.addResourceBundle('pt', GS_CHIP_NAMESPACE, pt);
  }
}

