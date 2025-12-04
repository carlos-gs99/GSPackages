# @carlos-gs99/gs-table

Advanced table component with server-side pagination, sorting, filtering, and CRUD operations.

## Installation

```bash
npm install @carlos-gs99/gs-table @tanstack/react-table
```

## Basic Usage

```tsx
import { GSTable } from '@carlos-gs99/gs-table';
import '@carlos-gs99/gs-table/styles.css';

const columns = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', type: 'email' },
];

function MyTable() {
  return (
    <GSTable
      entityConfig={{
        name: 'users',
        apiEndpoint: '/api/users',
      }}
      columns={columns}
      actions={{
        table: ['add'],
        row: ['view', 'edit', 'delete'],
      }}
    />
  );
}
```

## Features

- ✅ Server-side pagination
- ✅ Server-side sorting
- ✅ Global search + column filters
- ✅ CRUD operations (view, edit, add, delete)
- ✅ Row selection (bulk actions)
- ✅ Column visibility toggle
- ✅ Loading states
- ✅ Empty states
- ✅ Error handling
- ✅ Mock data support
- ✅ Custom fetch function
- ✅ Internationalization (EN/PT)
- ✅ Accessibility
- ✅ Debug mode
- ✅ TypeScript types
- ✅ TanStack Table integration

## Dependencies

### Dependencies
- `@tanstack/react-table ^8.20.5`

### Peer Dependencies
- `react ^18.0.0`
- `react-i18next ^15.0.0`
- `@carlos-gs99/hooks ^1.0.0`
- `@carlos-gs99/utils ^1.0.0`
- `@carlos-gs99/gs-button ^1.0.0`
- `@carlos-gs99/gs-icon ^1.0.0`
- `@carlos-gs99/gs-input ^1.0.0`
- `@carlos-gs99/gs-select ^1.0.0`
- `@carlos-gs99/gs-loading ^1.0.0`
- `@carlos-gs99/gs-modal ^1.0.0`

## License

MIT © Carlos Braga

