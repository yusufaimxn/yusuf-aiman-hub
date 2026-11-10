# Product Management Guide

Katalog produk Yusuf Aiman Digital Hub menggunakan satu sumber data di `src/data/catalog/`.

## Lokasi fail

- PDF cheatsheet: `public/assets/products/cheatsheets/files/`
- Cover cheatsheet: `public/assets/products/cheatsheets/covers/`
- PNG infographic: `public/assets/products/infographics/files/`
- Cover infographic: `public/assets/products/infographics/covers/`
- Logo brand: `public/assets/brand/`
- Metadata produk: `src/data/catalog/products.js`, `src/data/catalog/cheatsheets.js` dan `src/data/catalog/infographics.js`

Semua path dalam metadata bermula dari `/`, kerana ia merujuk kepada folder `public/`.

## Tambah cheatsheet baharu

1. Letakkan PDF dalam `public/assets/products/cheatsheets/files/`.
2. Render first page sebagai PNG dan simpan dalam `public/assets/products/cheatsheets/covers/`.
3. Tambah satu object dalam `src/data/catalog/cheatsheets.js`:

```js
{
  slug: 'contoh-cheatsheet',
  title: 'Contoh Cheatsheet',
  type: 'Cheat Sheet',
  category: 'Cheat Sheets',
  description: 'Penerangan ringkas berdasarkan kandungan PDF.',
  mark: 'EX',
  tone: 'blue',
  coverImage: '/assets/products/cheatsheets/covers/contoh-cheatsheet.png',
  fileUrl: '/assets/products/cheatsheets/files/contoh-cheatsheet.pdf',
  tags: ['Topic', 'Keyword'],
  status: 'available'
}
```

Produk akan muncul secara automatik dalam All Products, filter Cheat Sheets, search, product card dan route `/products/contoh-cheatsheet`.

## Tambah infographic baharu

1. Letakkan PNG yang boleh dimuat turun dalam `public/assets/products/infographics/files/`.
2. Simpan cover PNG dalam `public/assets/products/infographics/covers/`.
3. Tambah object dalam `src/data/catalog/infographics.js` dan gunakan helper `infographicAsset()` supaya action produk memaparkan `Download`.

```js
{
  slug: 'contoh-infographic',
  title: 'Contoh Infographic',
  type: 'Infographic',
  category: 'Infographics',
  description: 'Penerangan ringkas berdasarkan kandungan infographic.',
  mark: 'EX',
  tone: 'blue',
  tags: ['Topic', 'Keyword'],
  ...infographicAsset('contoh-infographic.png')
}
```

## Tambah digital guide atau ebook

Tambah object baharu dalam `src/data/catalog/products.js` dan gunakan category/type yang sesuai. Jika ada cover atau fail, simpan dalam subfolder `public/assets/products/` yang sepadan dan isi `coverImage` atau `fileUrl`.

## Tambah course, application atau service

Data semasa untuk courses, applications dan services masih berada di bahagian data masing-masing dalam `src/main.jsx`. Apabila koleksi ini bertambah, pindahkan array tersebut ke `src/data/catalog/` sebagai satu fail khusus dan import array itu ke page. Jangan duplicate product object dalam component.

## Cover image

Cover PDF perlu datang daripada first page PDF sebenar. Untuk jana semula cover, gunakan PyMuPDF dan render page pertama pada resolusi sekitar 1.6x, kemudian simpan sebagai PNG. Jangan crop atau recolour cover asal.

## Availability dan pricing

Gunakan `status: 'available'`, `'coming-soon'` atau `'unavailable'` apabila status diperlukan. Jangan tambah harga yang belum ditetapkan. Produk dengan `fileUrl` memaparkan CTA `Download`; jenis fail sebenar masih dikekalkan melalui URL dan nama fail download.

## Semak selepas menambah produk

```bash
npm run build
```

Kemudian semak All Products, category filter, search keyword, product detail route dan link fail PDF/PNG.
