import type{i18n}from'i18next';import en from'./i18n/en.json';import pt from'./i18n/pt.json';export const GS_ACCORDION_NAMESPACE='gs-accordion';let r=false;export const registerGSAccordionI18n=(i:i18n)=>{if(r)return;i.addResourceBundle('en',GS_ACCORDION_NAMESPACE,en,true,true);i.addResourceBundle('pt',GS_ACCORDION_NAMESPACE,pt,true,true);r=true;};

