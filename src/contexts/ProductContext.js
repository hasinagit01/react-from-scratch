import React, { createContext, useReducer } from 'react';
import productData from '../data/products.json';

export const ProductContext = createContext();

const productReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return [...state, action.payload];
    case 'UPDATE_PRODUCT':
      return state.map(product => 
        product.id === action.payload.id ? action.payload : product
      );
    case 'DELETE_PRODUCT':
      return state.filter(product => product.id !== action.payload);
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [products, dispatch] = useReducer(productReducer, productData);

  return (
    <ProductContext.Provider value={{ products, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
