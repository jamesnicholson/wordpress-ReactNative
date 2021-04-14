
import { createContext, Dispatch } from 'react'
import {IState, initialState} from '../index';
import TAction from '../actions';

interface IContext {
    state: IState;
    dispatch: Dispatch<TAction>;
}
const AppContext = createContext<IContext>({
    state: initialState,
    dispatch: () => null
});

export default AppContext