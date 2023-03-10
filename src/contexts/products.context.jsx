import { createContext, useState } from 'react';
// import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../Utilities/firebase/firebase.utility';
import PRODUCTS from '../shop-data.json';

export const ProductsContext = createContext({
  products: [],
});

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}
