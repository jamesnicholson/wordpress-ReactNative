import {ActionType} from './enums'
import Category from '../../api/models/category';
import Post from '../../api/models/post';

export interface IAction {
    type: ActionType;
    payload: any;
}
export interface ISetLoading {
    type: ActionType.SET_LOADING;
    payload: boolean
}
export interface ISetCategories{
    type: ActionType.SET_CATEGORIES;
    payload: Array<Category>;
}
export interface IGetCategories {
    type: ActionType.GET_CATEGORIES;
    payload: Array<Category>;
}
export interface ISetPosts {
    type: ActionType.SET_POSTS;
    payload: Array<Post>;
}
export interface IGetPosts {
    type: ActionType.GET_POSTS;
    payload: Array<Post>;
}
export interface ISetSearchTerm{
    type: ActionType.SET_SEARCH_TERM;
    payload: string;
}
