import i18next from 'i18next';
import en from './i18n/en.json';
import pt from './i18n/pt.json';

export const GS_SLIDER_NAMESPACE = 'GSSlider';

export const registerGSSliderI18n = (i18nInstance: typeof i18next) => {
  if (!i18nInstance.hasResourceBundle('en', GS_SLIDER_NAMESPACE)) {
    i18nInstance.addResourceBundle('en', GS_SLIDER_NAMESPACE, en);
  }
  if (!i18nInstance.hasResourceBundle('pt', GS_SLIDER_NAMESPACE)) {
    i18nInstance.addResourceBundle('pt', GS_SLIDER_NAMESPACE, pt);
  }
};

