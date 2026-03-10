import {type Dispatch, type SetStateAction, createContext} from 'react'

type ContextType = {
  language: string;
  categories: Array<string>;
  formats: Array<string>;
  setFormats: Dispatch<SetStateAction<Array<string>>>;
  setLanguage: Dispatch<SetStateAction<string>>;
  setCategories: Dispatch<SetStateAction<Array<string>>>;
};

export const FilterProvider = createContext<ContextType | null>(null);
