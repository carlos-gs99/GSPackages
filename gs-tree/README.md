# @carlos-gs99/gs-tree

Accessible hierarchical tree view component with expand/collapse and selection.

## Installation

```bash
npm install @carlos-gs99/gs-tree
```

## Usage

```tsx
import React from 'react';
import { GSTree } from '@carlos-gs99/gs-tree';
import { GSIcon } from '@carlos-gs99/gs-icon';

const data = [
  {
    key: 'folder1',
    title: 'Documents',
    icon: <GSIcon name="folder" size="sm" />,
    children: [
      { key: 'file1', title: 'Report.pdf', icon: <GSIcon name="file-document" size="sm" /> },
      { key: 'file2', title: 'Presentation.pptx', icon: <GSIcon name="file-powerpoint" size="sm" /> },
    ],
  },
  {
    key: 'folder2',
    title: 'Images',
    icon: <GSIcon name="folder-image" size="sm" />,
    children: [
      { key: 'img1', title: 'Photo1.jpg', icon: <GSIcon name="image" size="sm" /> },
    ],
  },
];

function FileExplorer() {
  return (
    <GSTree
      data={data}
      defaultExpandedKeys={['folder1']}
      onSelect={(node) => console.log('Selected:', node.title)}
    />
  );
}
```

## Features

- **Hierarchical Structure**: Unlimited nesting levels
- **Expand/Collapse**: Interactive tree navigation
- **Selection**: Single node selection
- **Custom Icons**: Per-node icon support
- **Accessibility**: ARIA attributes, keyboard navigation
- **i18n**: EN/PT translations
- **Debug Mode**: Built-in logging

