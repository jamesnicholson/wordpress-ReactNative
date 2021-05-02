import Category from '../../api/models/category';
import Post from '../../api/models/post';
import {ISetLoading, ISetCategories, IGetCategories, IGetPosts, ISetPosts, ISetSearchTerm, ISetParentCategory } from './interfaces';
import {ActionType} from './enums'

export const setLoading = (payload:boolean): ISetLoading => ({
    type: ActionType.SET_LOADING,
    payload
});
export const setCategories = (payload: Array<Category>): ISetCategories => ({
    type: ActionType.SET_CATEGORIES,
    payload
});
export const getCategories = (payload: Array<Category>): IGetCategories => ({
    type: ActionType.GET_CATEGORIES,
    payload
});
export const setPosts = (payload: Array<Post>): ISetPosts => ({
    type: ActionType.SET_POSTS,
    payload
});
export const getPosts = (payload: Array<Post>): IGetPosts => ({
    type: ActionType.GET_POSTS,
    payload
});
export const setSearchTerm = (payload: string): ISetSearchTerm => ({
    type: ActionType.SET_SEARCH_TERM,
    payload
});
export const setParentCategory = (payload: Category): ISetParentCategory => ({
    type: ActionType.SET_PARENT_CATEGORY,
    payload
});
type TAction = ISetLoading | ISetCategories | IGetCategories | ISetPosts | IGetPosts | ISetSearchTerm | ISetParentCategory;
export default TAction