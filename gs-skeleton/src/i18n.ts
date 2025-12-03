import type { i18n } from 'i18next';
import en from './i18n/en.json';
import pt from './i18n/pt.json';

export const GS_SKELETON_NAMESPACE = 'gsskeleton';

export function registerGSSkeletonI18n(instance: i18n) {
  if (!instance.hasResourceBundle('en', GS_SKELETON_NAMESPACE)) {
    instance.addResourceBundle('en', GS_SKELETON_NAMESPACE, en);
  }
  if (!instance.hasResourceBundle('pt', GS_SKELETON_NAMESPACE)) {
    instance.addResourceBundle('pt', GS_SKELETON_NAMESPACE, pt);
  }
}

export default GS_SKELETON_NAMESPACE;

