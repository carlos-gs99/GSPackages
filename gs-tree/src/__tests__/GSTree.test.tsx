import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSTree } from '../GSTree';
import type { GSTreeNode } from '../types';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

const mockTreeData: GSTreeNode[] = [
  {
    key: '1',
    title: 'Node 1',
    children: [
      {
        key: '1-1',
        title: 'Node 1-1',
      },
      {
        key: '1-2',
        title: 'Node 1-2',
      },
    ],
  },
  {
    key: '2',
    title: 'Node 2',
  },
];

describe('GSTree', () => {
  describe('Rendering', () => {
    it('should render tree', () => {
      const { container } = render(<GSTree data={mockTreeData} />);
      const tree = container.querySelector('[data-gs="GSTree"]');
      expect(tree).toBeInTheDocument();
    });

    it('should render nodes', () => {
      const { container } = render(<GSTree data={mockTreeData} />);
      const nodes = container.querySelectorAll('[data-gs-el="node"]');
      expect(nodes.length).toBeGreaterThan(0);
    });

    it('should render node titles', () => {
      render(<GSTree data={mockTreeData} />);
      expect(screen.getByText('Node 1')).toBeInTheDocument();
      expect(screen.getByText('Node 2')).toBeInTheDocument();
    });
  });

  describe('Tree Structure', () => {
    it('should render root nodes', () => {
      const { container } = render(<GSTree data={mockTreeData} />);
      const nodes = container.querySelectorAll('[data-gs-el="node"]');
      expect(nodes.length).toBeGreaterThanOrEqual(2);
    });

    it('should render child nodes when expanded', () => {
      const { container } = render(<GSTree data={mockTreeData} defaultExpandedKeys={['1']} />);
      expect(screen.getByText('Node 1-1')).toBeInTheDocument();
      expect(screen.getByText('Node 1-2')).toBeInTheDocument();
    });

    it('should not render child nodes when collapsed', () => {
      render(<GSTree data={mockTreeData} />);
      expect(screen.queryByText('Node 1-1')).not.toBeInTheDocument();
      expect(screen.queryByText('Node 1-2')).not.toBeInTheDocument();
    });
  });

  describe('Expand/Collapse', () => {
    it('should expand node when expand button is clicked', () => {
      const { container } = render(<GSTree data={mockTreeData} />);
      const expandButton = container.querySelector('[data-gs-el="expand-button"]') as HTMLElement;
      fireEvent.click(expandButton);
      expect(screen.getByText('Node 1-1')).toBeInTheDocument();
    });

    it('should collapse node when expand button is clicked again', () => {
      const { container } = render(<GSTree data={mockTreeData} defaultExpandedKeys={['1']} />);
      expect(screen.getByText('Node 1-1')).toBeInTheDocument();
      const expandButton = container.querySelector('[data-gs-el="expand-button"]') as HTMLElement;
      fireEvent.click(expandButton);
      expect(screen.queryByText('Node 1-1')).not.toBeInTheDocument();
    });

    it('should use defaultExpandedKeys', () => {
      render(<GSTree data={mockTreeData} defaultExpandedKeys={['1']} />);
      expect(screen.getByText('Node 1-1')).toBeInTheDocument();
    });
  });

  describe('Selection', () => {
    it('should call onSelect when node is clicked', () => {
      const onSelect = jest.fn();
      render(<GSTree data={mockTreeData} onSelect={onSelect} />);
      const nodeLabel = screen.getByText('Node 1');
      fireEvent.click(nodeLabel);
      expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ key: '1', title: 'Node 1' }));
    });

    it('should use defaultSelectedKeys', () => {
      const { container } = render(<GSTree data={mockTreeData} defaultSelectedKeys={['1']} />);
      const selectedNode = container.querySelector('[data-gs-el="node-content"][class*="Selected"]');
      expect(selectedNode).toBeInTheDocument();
    });

    it('should select only one node at a time', () => {
      const onSelect = jest.fn();
      render(<GSTree data={mockTreeData} onSelect={onSelect} />);
      fireEvent.click(screen.getByText('Node 1'));
      fireEvent.click(screen.getByText('Node 2'));
      expect(onSelect).toHaveBeenCalledTimes(2);
    });
  });

  describe('Disabled Nodes', () => {
    const disabledTreeData: GSTreeNode[] = [
      {
        key: '1',
        title: 'Disabled Node',
        disabled: true,
      },
    ];

    it('should render disabled node', () => {
      render(<GSTree data={disabledTreeData} />);
      expect(screen.getByText('Disabled Node')).toBeInTheDocument();
    });

    it('should not call onSelect when disabled node is clicked', () => {
      const onSelect = jest.fn();
      render(<GSTree data={disabledTreeData} onSelect={onSelect} />);
      const nodeLabel = screen.getByText('Disabled Node');
      fireEvent.click(nodeLabel);
      expect(onSelect).not.toHaveBeenCalled();
    });
  });

  describe('Icons', () => {
    const iconTreeData: GSTreeNode[] = [
      {
        key: '1',
        title: 'Node with Icon',
        icon: <span data-testid="custom-icon">Icon</span>,
      },
    ];

    it('should render node icon', () => {
      render(<GSTree data={iconTreeData} />);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('Empty Tree', () => {
    it('should render empty tree', () => {
      const { container } = render(<GSTree data={[]} />);
      const tree = container.querySelector('[data-gs="GSTree"]');
      expect(tree).toBeInTheDocument();
    });
  });
});

