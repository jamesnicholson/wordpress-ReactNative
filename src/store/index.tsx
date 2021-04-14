import React, {useReducer } from 'react'
import reducer from './reducers'
import AppContext from './context'

export interface IState {
    categories: any;
    posts: any;
    searchTerm: any;
    loading: boolean;
}

export const initialState: IState =  {
    categories: [],
    posts:[],
    searchTerm: "",
    loading: true,
}

const AppProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <AppContext.Provider value={{state, dispatch}}>
        {children}
      </AppContext.Provider>
    )
  }
  export default AppProvider