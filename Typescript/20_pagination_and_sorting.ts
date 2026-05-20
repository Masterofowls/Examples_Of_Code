type SortDirection = 'asc' | 'desc';

type SortSpec<T> = {
  key: keyof T;
  direction: SortDirection;
};

type PaginatedResult<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

const sortAndPaginate = <T extends Record<string, string | number>>(
  data: T[],
  sort: SortSpec<T>,
  page: number,
  pageSize: number,
): PaginatedResult<T> => {
  const sorted = [...data].sort((a, b) => {
    const left = a[sort.key];
    const right = b[sort.key];

    if (left < right) {
      return sort.direction === 'asc' ? -1 : 1;
    }

    if (left > right) {
      return sort.direction === 'asc' ? 1 : -1;
    }

    return 0;
  });

  const totalItems = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const start = (page - 1) * pageSize;
  const items = sorted.slice(start, start + pageSize);

  return {
    items,
    page,
    pageSize,
    totalItems,
    totalPages,
  };
};

const rows = [
  { id: 1, username: 'zoe', score: 9 },
  { id: 2, username: 'alex', score: 13 },
  { id: 3, username: 'mira', score: 11 },
  { id: 4, username: 'ben', score: 7 },
];

const page1 = sortAndPaginate(rows, { key: 'username', direction: 'asc' }, 1, 2);
console.log(page1);
