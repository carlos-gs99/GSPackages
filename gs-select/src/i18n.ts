import type { i18n } from 'i18next';
import en from './i18n/en.json';
import pt from './i18n/pt.json';

export const GS_SELECT_NAMESPACE = 'gsselect';

export function registerGSSelectI18n(instance: i18n) {
	try {
		instance.addResourceBundle('en', GS_SELECT_NAMESPACE, en as any, true, true);
		instance.addResourceBundle('pt', GS_SELECT_NAMESPACE, pt as any, true, true);
	} catch (_e) {
		// ignore in non-bundled environments
	}
}
