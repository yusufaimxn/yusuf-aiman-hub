import { cheatsheetProducts } from './cheatsheets';
import { infographicProducts } from './infographics';

const coreProducts = [
  { slug: 'teknologi-made-understandable', title: 'Technology, Made Understandable', type: 'Ebook', category: 'Ebooks', description: 'A visual guide for understanding technology concepts more clearly.', mark: 'TM', tone: 'blue', featured: true, tags: ['Technology', 'Education', 'Digital Literacy'] },
];

export const products = [...coreProducts, ...infographicProducts, ...cheatsheetProducts];

export { coreProducts };
