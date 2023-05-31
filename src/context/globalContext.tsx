import { createContext, useReducer } from 'react';
import { cloneDeep } from 'lodash-es';

const initialData = {
  blog: {},
};

type StateType = typeof initialData;
type ActionType = {
  type: string;
  payload: BlogType | BlogDetailType;
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'setBlog': {
      state.blog = cloneDeep(action.payload);
      return state;
    }
    default:
      return state;
  }
};

type GlobalContextType = {
  state: StateType;
  setBlog: (blog: BlogType | BlogDetailType) => void;
};

export const GlobalContext = createContext<GlobalContextType>({
  state: initialData,
  setBlog: () => ({}),
});

export const GlobalDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialData);

  const setBlog = (blog: BlogType | BlogDetailType) => {
    dispatch({ type: 'setBlog', payload: blog });
  };

  const value = { state, setBlog };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};
