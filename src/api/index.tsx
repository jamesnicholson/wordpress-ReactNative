import Category from './models/category'
import ICategory from './intefaces/category'
export default class APIEndpoints {
    static readonly URI = 'https://e-ina.com/wp-json/wp/v2';
    async getCategories(): Promise<Category[]> {
      const url = `${APIEndpoints.URI}/categories`;
      const categoryList: ICategory[] = await fetch(url) 
                                              .then(response => {
                                                if (response.ok) {
                                                  return response.json();
                                                } else {
                                                  throw new Error(`Something went wrong with the api`);
                                                }
                                              }) 
                                              .catch(e => {
                                                  console.log('Connection error', e)
                                              });
      const categories = categoryList.map((category: ICategory) => {
      return new Category(category.name, category.id);
    })
        return Promise.all(categories);
    }
}