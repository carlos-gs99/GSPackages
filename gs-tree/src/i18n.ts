import i18next from 'i18next';
import en from './i18n/en.json';
import pt from './i18n/pt.json';

export const GS_TREE_NAMESPACE = 'GSTree';

export const registerGSTreeI18n = (i18nInstance: typeof i18next) => {
  if (!i18nInstance.hasResourceBundle('en', GS_TREE_NAMESPACE)) {
    i18nInstance.addResourceBundle('en', GS_TREE_NAMESPACE, en);
  }
  if (!i18nInstance.hasResourceBundle('pt', GS_TREE_NAMESPACE)) {
    i18nInstance.addResourceBundle('pt', GS_TREE_NAMESPACE, pt);
  }
};

