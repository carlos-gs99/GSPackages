import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { useDebug } from '@carlos-gs99/utils';
import styles from './styles.module.css';
import type { GSTabsProps, GSTabsRef, GSTabItem } from './types';
import { registerGSTabsI18n, GS_TABS_NAMESPACE } from './i18n';

const getFirstEnabledTab = (tabs: GSTabItem[]): string => {
  const firstEnabled = tabs.find((tab) => !tab.disabled);
  return firstEnabled?.id ?? '';
};

const GSTabsInner = (
  {
    tabs,
    defaultValue,
    value: controlledValue,
    onValueChange,
    orientation = 'horizontal',
    variant = 'solid',
    size = 'md',
    color = 'primary',
    fullWidth = false,
    keepMounted = true,
    debug = false,
    ariaLabel,
    className,
    tabListClassName,
    tabPanelClassName,
    style,
    ...rest
  }: GSTabsProps,
  ref: React.Ref<GSTabsRef>
) => {
  const { i18n } = useTranslation(GS_TABS_NAMESPACE);

  useEffect(() => {
    registerGSTabsI18n(i18n);
  }, [i18n]);

  const debugTools = useDebug('GSTabs', debug);

  const initialDefault = useMemo(() => {
    if (defaultValue && tabs.some((tab) => tab.id === defaultValue && !tab.disabled)) {
      return defaultValue;
    }
    return getFirstEnabledTab(tabs);
  }, [defaultValue, tabs]);

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string>(initialDefault);

  const activeValue = useMemo(() => {
    const candidate = isControlled ? controlledValue : internalValue;
    if (candidate && tabs.some((tab) => tab.id === candidate && !tab.disabled)) {
      return candidate;
    }
    return getFirstEnabledTab(tabs);
  }, [isControlled, controlledValue, internalValue, tabs]);

  useEffect(() => {
    debugTools.log('render', { activeValue, isControlled, tabsCount: tabs.length });
  }, [debugTools, activeValue, isControlled, tabs.length]);

  const handleTabClick = useCallback((tabId: string) => {
    const tab = tabs.find((t) => t.id === tabId);
    if (tab?.disabled) return;

    if (!isControlled) {
      setInternalValue(tabId);
    }
    onValueChange?.(tabId);
  }, [tabs, isControlled, onValueChange]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent, tabId: string) => {
    const currentIndex = tabs.findIndex((tab) => tab.id === tabId);
    let nextIndex = currentIndex;

    if (orientation === 'horizontal') {
      if (event.key === 'ArrowLeft') nextIndex = currentIndex - 1;
      if (event.key === 'ArrowRight') nextIndex = currentIndex + 1;
    } else {
      if (event.key === 'ArrowUp') nextIndex = currentIndex - 1;
      if (event.key === 'ArrowDown') nextIndex = currentIndex + 1;
    }

    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;

    if (nextIndex !== currentIndex) {
      event.preventDefault();
      while (nextIndex >= 0 && nextIndex < tabs.length && tabs[nextIndex]?.disabled) {
        nextIndex += nextIndex > currentIndex ? 1 : -1;
      }
      if (nextIndex >= 0 && nextIndex < tabs.length) {
        handleTabClick(tabs[nextIndex].id);
      }
    }
  }, [tabs, orientation, handleTabClick]);

  return (
    <div
      ref={ref}
      className={clsx(styles.tabs, className)}
      data-gs="GSTabs"
      data-orientation={orientation}
      style={style}
      {...rest}
    >
      <div className={styles.tabListWrapper} data-orientation={orientation}>
        <div
          role="tablist"
          aria-label={ariaLabel}
          aria-orientation={orientation}
          className={clsx(styles.tabList, tabListClassName)}
          data-orientation={orientation}
          data-variant={variant}
          data-size={size}
          data-color={color}
          data-full-width={fullWidth || undefined}
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeValue;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-controls={`panel-${tab.id}`}
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                disabled={tab.disabled}
                onClick={() => handleTabClick(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, tab.id)}
                className={clsx(styles.tab, {
                  [styles.tabActive]: isActive,
                  [styles.tabDisabled]: tab.disabled,
                })}
                data-gs-el="tab"
                data-active={isActive || undefined}
              >
                {tab.icon && <span className={styles.tabIcon}>{tab.icon}</span>}
                <span className={styles.tabLabel}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.panels}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeValue;
          if (!keepMounted && !isActive) return null;

          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={`panel-${tab.id}`}
              aria-labelledby={`tab-${tab.id}`}
              hidden={!isActive}
              className={clsx(styles.panel, tabPanelClassName, {
                [styles.panelActive]: isActive,
              })}
              data-gs-el="panel"
            >
              {tab.content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const GSTabs = forwardRef(GSTabsInner);
GSTabs.displayName = 'GSTabs';

export default GSTabs;

