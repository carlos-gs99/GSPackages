// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { GSSelect } from '@carlos-gs99/gs-select';
import { useTranslation } from '@carlos-gs99/hooks';
import { registerGSAutocompleteI18n, GS_AUTOCOMPLETE_NAMESPACE } from './i18n';
import type { GSAutocompleteProps } from './types';

/**
 * GSAutocomplete - Specialized version of GSSelect for autocomplete/search use cases
 * 
 * This is essentially a GSSelect with:
 * - search enabled by default
 * - searchable forced to true
 * - single select only
 * - optimized for autocomplete UX
 */
const GSAutocomplete = <T = any,>(props: GSAutocompleteProps<T>) => {
  const {
    placeholder,
    ...selectProps
  } = props;

  const { t, i18n } = useTranslation(GS_AUTOCOMPLETE_NAMESPACE);
  registerGSAutocompleteI18n(i18n);

  return (
    <GSSelect
      {...selectProps}
      searchable={true}
      multiple={false}
      placeholder={placeholder || t('autocomplete.placeholder')}
    />
  );
};

GSAutocomplete.displayName = 'GSAutocomplete';

export { GSAutocomplete };
export default GSAutocomplete;

