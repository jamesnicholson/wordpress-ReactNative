import Category from './models/category'
import ICategory from './intefaces/category'
import Post from './models/post'
import IPost from './intefaces/post'
import IPosts from './intefaces/posts'
import ISearchResult from './intefaces/searchResult'
import SearchResult from './models/searchResult'

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
        return new Category(category.id, category.name, category.count);
      })
      return Promise.all(categories);
    }

    async getPosts(categoryId: number): Promise<Post[]> {
      const url = `${APIEndpoints.URI}/posts?categories=${categoryId}`;
      const postList: IPosts[] = await fetch(url) 
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
      const posts = postList.map((post: IPosts) => {
        return new Post(post.id, categoryId, post.title.rendered, post.content.rendered);
      })
      return Promise.all(posts);
    }

    async getPost(postId: number): Promise<Post> {
      const url = `${APIEndpoints.URI}/posts/${postId}`;
      const postList: IPost = await fetch(url) 
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
      return new Post(postList.id, postList.categories[0], postList.title.rendered, postList.content.rendered);
    }


    async searchPosts(searchTerm: string): Promise<SearchResult[]> {
      const url = `${APIEndpoints.URI}/search?search=${searchTerm}`;
      const resultList: ISearchResult[] = await fetch(url) 
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

        const searchResults = resultList.map((searchResult: ISearchResult) => {
        return new SearchResult(searchResult.id, searchResult.title);
    })
      return Promise.all(searchResults);
    }




}