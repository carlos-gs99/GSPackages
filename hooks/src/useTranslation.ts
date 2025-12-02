import { useTranslation as useI18nTranslation } from 'react-i18next';

export const useTranslation = (namespace?: string) => {
  const { t, i18n } = useI18nTranslation(namespace);
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  const getCurrentLanguage = () => {
    return i18n.language;
  };
  
  const getAvailableLanguages = () => {
    return [
      { code: 'pt', name: 'Português', flag: 'PT' },
      { code: 'en', name: 'English', flag: 'GBR' },
    ];
  };
  
  return {
    t,
    changeLanguage,
    getCurrentLanguage,
    getAvailableLanguages,
    i18n,
  };
};
