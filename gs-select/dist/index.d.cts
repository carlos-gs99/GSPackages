import React$1 from 'react';
import { i18n } from 'i18next';

type GSColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
type GSSize = 'sm' | 'md' | 'lg';
interface GSSelectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
    icon?: React.ReactNode;
    description?: string;
}
interface GSSelectOptionGroup {
    label: string;
    options: GSSelectOption[];
}
type GSSelectVariant = 'outlined' | 'filled' | 'standard' | 'soft' | 'solid' | 'plain';
type GSSelectValidationState = 'success' | 'error' | 'warning' | null;
interface GSSelectProps {
    options?: GSSelectOption[];
    optionGroups?: GSSelectOptionGroup[];
    value?: string | number | (string | number)[];
    onChange?: (value: string | number | (string | number)[]) => void;
    defaultValue?: string | number | null;
    label?: string;
    error?: string;
    helperText?: string;
    required?: boolean;
    size?: GSSize;
    variant?: GSSelectVariant;
    color?: GSColor;
    placeholder?: string;
    disabled?: boolean;
    loading?: boolean;
    clearable?: boolean;
    clearButtonOutside?: boolean;
    onClear?: () => void;
    validationState?: GSSelectValidationState;
    showValidationIcon?: boolean;
    validationIconOutside?: boolean;
    loadingPosition?: 'inside' | 'outside';
    searchable?: boolean;
    searchPlaceholder?: string;
    onSearch?: (query: string) => void;
    async?: boolean;
    loadOptions?: (query: string) => Promise<GSSelectOption[]>;
    debounceTime?: number;
    loadingMessage?: string;
    multiple?: boolean;
    maxSelections?: number;
    className?: string;
    selectClassName?: string;
    labelClassName?: string;
    dropdownClassName?: string;
    id?: string;
    name?: string;
    fullWidth?: boolean;
    widthMode?: 'min' | 'auto' | 'compact' | 'full';
    maxHeight?: number | string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    alignSelectedToTrigger?: boolean;
    startDecorator?: React.ReactNode;
    endDecorator?: React.ReactNode;
    renderOption?: (option: GSSelectOption, selected: boolean) => React.ReactNode;
    renderValue?: (option: GSSelectOption | null) => React.ReactNode;
    emptyMessage?: string;
    debug?: boolean;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    ariaDescribedBy?: string;
    ariaRequired?: boolean;
}

declare const GSSelect: React$1.ForwardRefExoticComponent<GSSelectProps & React$1.RefAttributes<HTMLDivElement>>;

declare const GS_SELECT_NAMESPACE = "gsselect";
declare function registerGSSelectI18n(instance: i18n): void;

export { GSSelect, type GSSelectOption, type GSSelectOptionGroup, type GSSelectProps, type GSSelectValidationState, type GSSelectVariant, GS_SELECT_NAMESPACE, GSSelect as default, registerGSSelectI18n };
