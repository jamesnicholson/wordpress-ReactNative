import APIEndpoints from '../api'
import Database from '../api/db'
import Category from './models/category'
export default class DataService {
   
    async getCategories(): Promise<Category[]> {
        const db = new Database();
        const api = new APIEndpoints();
        let list = await db.getCategories().then((category: Category[]) => category);
        if(list.length === 0){
            console.log("GET FRESH DATA");
            let data =  await api.getCategories().then((category: Category[]) => category)
            data.map((category: Category) => db.addCategory(category))
        }
        return  db.getCategories().then((category: Category[]) => category) 
    }

}