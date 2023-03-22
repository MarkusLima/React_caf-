import { createContext, useContext } from 'react';

export type CategoryType = {
    category: string;
    //setCategory: (category: string) => void;
}

export const CategoryContext = createContext<CategoryType>(
  { 
    category: 'hot', 
    //setCategory: string => console.warn('no theme provider')
  }
);

export const useCategory = () => useContext(CategoryContext);




