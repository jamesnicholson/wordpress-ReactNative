import APIEndpoints from '../api'
import Category from './models/category'
export default class DataService {
    
    async getCategories(): Promise<Category[]> {
        const api = new APIEndpoints();
        //TODO: Load Categories from cache
        return this.getAPICategories();
    }
    private async getAPICategories(): Promise<Category[]> {
        const api = new APIEndpoints();
        return api.getCategories().then((category: Category[]) => category);
    }
}