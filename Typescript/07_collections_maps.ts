type Product = {
  id: number;
  name: string;
  category: string;
};

const products: Product[] = [
  { id: 1, name: 'Keyboard', category: 'electronics' },
  { id: 2, name: 'Mouse', category: 'electronics' },
  { id: 3, name: 'Bottle', category: 'home' },
];

const byId = new Map<number, Product>(
  products.map((product) => [product.id, product]),
);

const groupedByCategory = products.reduce<Map<string, Product[]>>((acc, product) => {
  const list = acc.get(product.category) ?? [];
  list.push(product);
  acc.set(product.category, list);
  return acc;
}, new Map());

console.log('Product #2:', byId.get(2));
console.log('Grouped:', Object.fromEntries(groupedByCategory));
