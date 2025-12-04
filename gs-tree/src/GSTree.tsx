import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { useDebug } from '@carlos-gs99/utils';
import { GSIcon } from '@carlos-gs99/gs-icon';
import { GS_TREE_NAMESPACE, registerGSTreeI18n } from './i18n';
import type { GSTreeProps, GSTreeNode } from './types';
import styles from './styles.module.css';

export const GSTree: React.FC<GSTreeProps> = ({
  data,
  onSelect,
  defaultExpandedKeys = [],
  defaultSelectedKeys = [],
  className,
  debug = false,
  ...rest
}) => {
  const { t, i18n } = useTranslation(GS_TREE_NAMESPACE);
  React.useEffect(() => {
    registerGSTreeI18n(i18n);
  }, [i18n]);

  const debugTools = useDebug('GSTree', debug);

  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set(defaultExpandedKeys));
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set(defaultSelectedKeys));

  const toggleExpand = useCallback((key: string) => {
    setExpandedKeys(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
    debugTools.log('toggle expand', { key });
  }, [debugTools]);

  const handleSelect = useCallback((node: GSTreeNode) => {
    setSelectedKeys(new Set([node.key]));
    onSelect?.(node);
    debugTools.log('node selected', { key: node.key, title: node.title });
  }, [onSelect, debugTools]);

  const renderNode = useCallback((node: GSTreeNode, level = 0): React.ReactNode => {
    const isExpanded = expandedKeys.has(node.key);
    const isSelected = selectedKeys.has(node.key);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.key} className={styles.treeNode} data-gs-el="node">
        <div
          className={clsx(styles.nodeContent, {
            [styles.nodeContentSelected]: isSelected,
            [styles.nodeContentDisabled]: node.disabled,
          })}
          style={{ paddingLeft: `${level * 1.5}rem` }}
          data-gs-el="node-content"
        >
          {hasChildren ? (
            <button
              type="button"
              className={styles.expandButton}
              onClick={() => toggleExpand(node.key)}
              aria-label={isExpanded ? t('aria.collapse') : t('aria.expand')}
              data-gs-el="expand-button"
            >
              <GSIcon name={isExpanded ? 'chevron-down' : 'chevron-right'} size="sm" />
            </button>
          ) : (
            <span className={styles.expandPlaceholder} />
          )}
          {node.icon && <span className={styles.nodeIcon}>{node.icon}</span>}
          <button
            type="button"
            className={styles.nodeLabel}
            onClick={() => !node.disabled && handleSelect(node)}
            disabled={node.disabled}
            aria-label={`${t('aria.selectNode')}: ${node.title}`}
            data-gs-el="node-label"
          >
            {node.title}
          </button>
        </div>
        {hasChildren && isExpanded && (
          <div className={styles.nodeChildren} data-gs-el="children">
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  }, [expandedKeys, selectedKeys, toggleExpand, handleSelect, t]);

  React.useEffect(() => {
    debugTools.log('render', { dataLength: data.length, expandedCount: expandedKeys.size, selectedCount: selectedKeys.size });
  }, [debugTools, data.length, expandedKeys.size, selectedKeys.size]);

  return (
    <div
      className={clsx(styles.tree, className)}
      data-gs="GSTree"
      data-gs-debug={debug ? 'true' : undefined}
      role="tree"
      aria-label={t('aria.tree')}
      {...rest}
    >
      {data.map(node => renderNode(node))}
    </div>
  );
};

GSTree.displayName = 'GSTree';
export default GSTree;

