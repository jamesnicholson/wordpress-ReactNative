import APIEndpoints from '../api'
import Database from '../api/db'
import { PostType } from './intefaces/enums';
import Category from './models/category'
import Post from './models/post'
import SearchResult from './models/searchResult';

export default class DataService {
    db = new Database();
    api = new APIEndpoints();

    async getHomeScreen(): Promise<Category[]> {
        let list = await this.db.getHomeScreen().then((category: Category[]) => category);
        if(list.length === 0){
            console.log("GET FRESH DATA");
            let data =  await this.api.getHomeScreen().then((category: Category[]) => category)
            data.map((category: Category, index:number) => this.db.addCategory(category, index))
        }
        return  this.db.getHomeScreen().then((category: Category[]) => category) 
    }

    async getCategories(parentID: number): Promise<Category[]> {
        let list = await this.db.getCategories(parentID).then((category: Category[]) => category);
        if(list.length === 0){
            console.log("GET FRESH DATA");
            let data =  await this.api.getCategories(parentID).then((category: Category[]) => category)
            data.map((category: Category, index:number) => this.db.addCategory(category, index))
        }
        return  this.db.getCategories(parentID).then((category: Category[]) => category) 
    }

    async getPosts(categoryId: number): Promise<Post[]> {
       let list = await this.db.getPosts(categoryId);
       if(list.length === 0){
            console.log("GET FRESH DATA");
            let data =  await this.api.getPosts(categoryId).then((post: Post[]) => post)
            if(data.length > 0){
                data.map((post: Post) => this.db.addPost(categoryId, post))
                console.log(data)
            }
          
        }
      return  this.db.getPosts(categoryId).then((post: Post[]) => post) 
    }

    async getPost(postId: number, type: PostType): Promise<Post> {

        return  type === PostType.SEARCHED ?
                    this.api.getPost(postId).then((post: Post) => post)
                :   this.db.getPost(postId).then((post: Post) => post)
    }

    async searchPosts(searchTerm: string): Promise<SearchResult[]> {
        let data =  await this.api.searchPosts(searchTerm).then((post: SearchResult[]) => post)
        return  data
    }
}