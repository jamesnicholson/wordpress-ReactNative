import APIEndpoints from '../api'
import Database from '../api/db'
import Category from './models/category'
import Post from './models/post'
export default class DataService {
    db = new Database();
    api = new APIEndpoints();

    async getCategories(): Promise<Category[]> {
        let list = await this.db.getCategories().then((category: Category[]) => category);
        if(list.length === 0){
            console.log("GET FRESH DATA");
            let data =  await this.api.getCategories().then((category: Category[]) => category)
            data.map((category: Category) => this.db.addCategory(category))
        }
        return  this.db.getCategories().then((category: Category[]) => category) 
    }
    async getPosts(categoryId: number): Promise<Post[]> {

       let list = await this.db.getPosts(categoryId);
       if(list.length === 0){
            console.log("GET FRESH DATA");
            let data =  await this.api.getPosts(categoryId).then((post: Post[]) => post)
            data.map((post: Post) => this.db.addPost(categoryId, post))
      }
      return  this.db.getPosts(categoryId).then((post: Post[]) => post) 
    }
    async getPost(postId: number): Promise<Post> {
       return  this.db.getPost(postId).then((post: Post) => post) 
    }
}