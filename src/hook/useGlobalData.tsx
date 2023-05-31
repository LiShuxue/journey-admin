import { useContext } from 'react';
import { GlobalContext } from '../context/globalContext';

export const useGlobalData = () => {
  return useContext(GlobalContext);
};
