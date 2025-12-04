import React from 'react';

export interface GSTreeNode {
  /** Unique key for the node */
  key: string;
  /** Display title */
  title: string;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Whether the node is disabled */
  disabled?: boolean;
  /** Child nodes */
  children?: GSTreeNode[];
}

export interface GSTreeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Tree data */
  data: GSTreeNode[];
  /** Callback when a node is selected */
  onSelect?: (node: GSTreeNode) => void;
  /** Default expanded node keys */
  defaultExpandedKeys?: string[];
  /** Default selected node keys */
  defaultSelectedKeys?: string[];
  /** Debug mode */
  debug?: boolean;
}

