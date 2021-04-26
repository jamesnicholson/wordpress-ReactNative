import Category from './models/category'
import ICategory from './intefaces/category'
import Post from './models/post'
import IPost from './intefaces/post'
import IPosts from './intefaces/posts'
import ISearchResult from './intefaces/searchResult'
import SearchResult from './models/searchResult'
import base64 from 'react-native-base64'
export default class APIEndpoints {

    static readonly URI = 'https://e-ina.com/wp-json';
    static readonly USER = 'James'
    static readonly PASSWORD = 'c7rl q6iv 3bdX OaoA 9amr SoKp'

    encoded = base64.encode(`${APIEndpoints.USER}:${APIEndpoints.PASSWORD}`)
    auth = { 
      headers: {
        'Authorization': `Basic ${this.encoded}`,
        'Content-Type': 'application/json'
      },
    };
    async getHomeScreen(): Promise<Category[]> {
      const url = `${APIEndpoints.URI}/homescreen/list`;
      const categoryList: ICategory[] = await fetch(url, this.auth) 
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
        console.log(category.id)
        return new Category(category.id, category.name, "homescreen", category.image, category.count, category.parent);
      })
      return Promise.all(categories);
    }

    async getCategories(parentId: number): Promise<Category[]> {
      const url = `${APIEndpoints.URI}/wp/v2/categories?parent=${parentId}`;
      const categoryList: ICategory[] = await fetch(url, this.auth) 
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
        return new Category(category.id, category.name, "sub", category.image, category.count, category.parent);
      })
      return Promise.all(categories);
    }

    async getPosts(categoryId: number): Promise<Post[]> {
      const url = `${APIEndpoints.URI}/wp/v2/posts?categories=${categoryId}`;
      const postList: IPosts[] = await fetch(url, this.auth) 
                                              .then(response => {
                                                if (response.ok) {
                                                  return response.json();
                                                } else {
                                                  throw new Error(`Something went wrong with the api`);
                                                }
                                              }).finally(() => {
                                                    console.log(url)
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
      const url = `${APIEndpoints.URI}/wp/v2/posts/${postId}`;
      const postList: IPost = await fetch(url, this.auth) 
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
      const url = `${APIEndpoints.URI}/wp/v2/search?search=${searchTerm}`;
      const resultList: ISearchResult[] = await fetch(url, this.auth) 
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