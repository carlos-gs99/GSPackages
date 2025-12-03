import type { i18n } from 'i18next';
import { useTranslation } from '@carlos-gs99/hooks';
import en from './i18n/en.json';
import pt from './i18n/pt.json';

export const GS_TOOLTIP_NAMESPACE = 'gstooltip';

export function registerGSTooltipI18n(instance: i18n) {
	try {
		instance.addResourceBundle('en', GS_TOOLTIP_NAMESPACE, en as any, true, true);
		instance.addResourceBundle('pt', GS_TOOLTIP_NAMESPACE, pt as any, true, true);
	} catch (_e) {
		// ignore in non-bundled environments
	}
}

export const useGSTooltipTranslation = () => {
	return useTranslation(GS_TOOLTIP_NAMESPACE);
};
