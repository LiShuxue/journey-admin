import { createContext, useContext, useReducer } from 'react';
import { cloneDeep } from 'lodash-es';

const initialData = {
  blog: {},
};

function reducer(state: any, action: { type: string; payload: any }) {
  switch (action.type) {
    case 'setBlog': {
      state.blog = cloneDeep(action.payload);
      return state;
    }
    default:
      return state;
  }
}

type GlobalContextType = {
  state: any;
  setBlog: (blog: BlogType | BlogDetailType) => void;
};

const GlobalContext = createContext<GlobalContextType>(null!);

export const useGlobalData = () => {
  return useContext(GlobalContext);
};

export const GlobalDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialData);

  const setBlog = (blog: BlogDetailType) => {
    dispatch({ type: 'setBlog', payload: blog });
  };

  const value = { state, setBlog };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};
