import type { GSTableColumn, GSTableAction, GSTableActionsConfig, EntityConfig } from '../types';
import { ACTION_DEFAULTS, COLUMN_DEFAULTS } from '../types';

export const applyColumnDefaults = <TData,>(column: GSTableColumn<TData>): GSTableColumn<TData> => {
  return {
    ...COLUMN_DEFAULTS,
    ...column,
  };
};

export const applyActionDefaults = <TData,>(
  actionsConfig: GSTableActionsConfig<TData>,
  _entityConfig: EntityConfig,
  _autoPermissions: boolean,
  t: (key: string) => string
): GSTableActionsConfig<TData> & { allActions: GSTableAction<TData>[] } => {
  const allActions: GSTableAction<TData>[] = [];

  // Process table actions
  const tableActions = actionsConfig.table || [];
  tableActions.forEach((actionKey) => {
    const defaults = ACTION_DEFAULTS[actionKey as keyof typeof ACTION_DEFAULTS] || {};
    const custom = actionsConfig.config?.[actionKey] || {};
    const action = {
      key: actionKey,
      type: 'table' as const,
      enabled: true,
      label: t(`actions.${actionKey}`),
      ...defaults,
      ...custom,
    } as GSTableAction<TData>;
    allActions.push(action);
  });

  // Process row actions
  const rowActions = actionsConfig.row || [];
  rowActions.forEach((actionKey) => {
    const defaults = ACTION_DEFAULTS[actionKey as keyof typeof ACTION_DEFAULTS] || {};
    const custom = actionsConfig.config?.[actionKey] || {};
    const action = {
      key: actionKey,
      type: 'row' as const,
      enabled: true,
      label: t(`actions.${actionKey}`),
      ...defaults,
      ...custom,
    } as GSTableAction<TData>;
    allActions.push(action);
  });

  // Add custom actions
  if (actionsConfig.custom) {
    allActions.push(...actionsConfig.custom);
  }

  return {
    ...actionsConfig,
    allActions,
  };
};

