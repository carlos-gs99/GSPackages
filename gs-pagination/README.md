# @carlos-gs99/gs-pagination

Pagination component for navigating between pages with GSButton integration.

## Installation

```bash
npm install @carlos-gs99/gs-pagination
```

## Basic Usage

```tsx
import { GSPagination } from '@carlos-gs99/gs-pagination';

function MyTable() {
  const [page, setPage] = useState(1);
  const pageCount = 10;

  return (
    <GSPagination
      page={page}
      pageCount={pageCount}
      onPageChange={setPage}
    />
  );
}
```

## Features

- ✅ Previous/Next navigation
- ✅ Page counter display
- ✅ Disabled states (first/last page)
- ✅ GSButton integration
- ✅ TypeScript types

## Examples

### With Table

```tsx
function DataTable() {
  const [page, setPage] = useState(1);
  const data = fetchData(page);
  const totalPages = Math.ceil(data.total / data.pageSize);

  return (
    <>
      <table>{/* Table content */}</table>
      <GSPagination
        page={page}
        pageCount={totalPages}
        onPageChange={setPage}
      />
    </>
  );
}
```

### Server-Side Pagination

```tsx
function ServerTable() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/api/data?page=${page}`)
      .then(res => res.json())
      .then(setData);
  }, [page]);

  return (
    <GSPagination
      page={page}
      pageCount={data.totalPages}
      onPageChange={setPage}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `page` | `number` | - | Current page number (1-indexed) |
| `pageCount` | `number` | - | Total number of pages |
| `onPageChange` | `(page: number) => void` | - | Page change handler |

## Dependencies

### Peer Dependencies
- `react ^18.0.0`
- `@carlos-gs99/gs-button ^1.0.0`

## License

MIT © Carlos Braga

