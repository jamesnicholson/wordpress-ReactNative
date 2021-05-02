import {IState} from '../index';
import TActions from '../actions';
import {ActionType} from '../actions/enums'
import Category from '../../api/models/category';
import Post from '../../api/models/post';

function reducer(state: IState, action: TActions): IState{
    const {type, payload} = action
    switch(type){
        case ActionType.SET_CATEGORIES:
            return {...state, categories: payload}
        case ActionType.SET_POSTS:
                return {...state, posts: payload}
        case ActionType.SET_SEARCH_TERM:
            return {...state, searchTerm: payload}
        case ActionType.SET_LOADING:
            return {...state, loading: false}
        case ActionType.SET_PARENT_CATEGORY:
            return {...state, parentCategory: payload}           
        default:
            return state
    }
}
export default reducer;