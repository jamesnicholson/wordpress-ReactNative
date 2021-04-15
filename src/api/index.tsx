import Category from './models/category'
import ICategory from './intefaces/category'
import Post from './models/post'
import IPost from './intefaces/post'
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
      return new Category(category.id, category.name);
    })
        return Promise.all(categories);
    }

    async getPosts(categoryId): Promise<Post[]> {
      const url = `${APIEndpoints.URI}/posts?categories=${categoryId}`;
      const postList: IPost[] = await fetch(url) 
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
      const posts = postList.map((post: IPost) => {
      return new Post(post.id, categoryId, post.title.rendered, post.content.rendered);
    })
        return Promise.all(posts);
    }
}