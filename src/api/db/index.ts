import SQLite from 'react-native-sqlite-storage'
import Category from '../models/category'
import Post from '../models/post';

export default class Database {
    db: any = SQLite.openDatabase("e-ina.db", "1.0", "e-ina Database", 200000);
    constructor(){
      this.createTables()
    }

    ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
        this.db.transaction((trans) => {
          trans.executeSql(sql, params, (trans, results) => {
            resolve(results);
          },
            (error) => {
              reject(error);
            });
        });
    });
    onDbError(tx, err){
      console.log('There is error', err);
    }
    async createTables() {
      this.ExecuteQuery("CREATE TABLE IF NOT EXISTS category (id INTEGER PRIMARY KEY NOT NULL, name TEXT)", []);
      this.ExecuteQuery("CREATE TABLE IF NOT EXISTS post (id INTEGER PRIMARY KEY NOT NULL, categoryId INTEGER, title TEXT, content BLOB)", []);
    }

    async addCategory(category: Category){
      if(category.name !== "Uncategorized"){
        this.ExecuteQuery('INSERT INTO category VALUES (?, ?)', [category.id, category.name])
          .catch((error) => {
            console.log(error)
        });
      }
    }

    async getCategories() {
      let categories = [];
      let selectQuery: any = await this.ExecuteQuery("SELECT * FROM category", []);
      var rows = selectQuery.rows;
      for (let i = 0; i < rows.length; i++) {
        var item = rows.item(i);
        categories.push(new Category(item.id, item.name))
      }
      return categories;
    }
    ////////
      
    async addPost(categoryId:number, post: Post){
      console.log(post)
        this.ExecuteQuery('INSERT INTO post VALUES (?, ?, ?, ?)', [post.id, categoryId, post.title, post.content])
          .catch((error) => {
            console.log(error)
        });
    }

    async getPosts(categoryId) {
      let posts = [];
      let sql = 'SELECT * FROM post WHERE categoryId = ' + categoryId;
      let selectQuery: any = await this.ExecuteQuery(sql, []);
      var rows = selectQuery.rows;
      for (let i = 0; i < rows.length; i++) {
        var item = rows.item(i);
        posts.push(new Post(item.id, categoryId, item.title, item.content))
      }
    return posts;
  }

}