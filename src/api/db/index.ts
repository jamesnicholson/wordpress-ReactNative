import SQLite from 'react-native-sqlite-storage'
import Category from '../models/category'
import Post from '../models/post';

export default class Database {
    db: any = SQLite.openDatabase("e-ina.db", "1.3", "e-ina Database", 200000);
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
      //uncomment to clear local storage
     // this.ExecuteQuery("DROP TABLE category", []);
      //this.ExecuteQuery("DROP TABLE post", []);
      this.ExecuteQuery("CREATE TABLE IF NOT EXISTS category (id INTEGER PRIMARY KEY AUTOINCREMENT, categoryId INTEGER, name TEXT, type TEXT, image TEXT, count INTEGER, position INTEGER, parent INTEGER)", []);
      this.ExecuteQuery("CREATE TABLE IF NOT EXISTS post (id INTEGER PRIMARY KEY AUTOINCREMENT, postId INTEGER, categoryId INTEGER, title TEXT, content BLOB)", []);
    }

    async addCategory(category: Category, position: number){
      if(category.name !== "Uncategorized"){
        let sql = `INSERT INTO category (categoryId, name, type, image ,count, position, parent) VALUES (${category.categoryId}, '${category.name}', '${category.type}', '${category.image}', ${category.count}, ${position}, ${category.parent})`;
        this.ExecuteQuery(sql)
          .catch((error) => {
            console.log(error)
        });
      }
    }

    async getHomeScreen() {
      let categories = [];
      let sql = `SELECT * FROM category WHERE type = 'homescreen' ORDER BY position ASC`;
      let selectQuery: any = await this.ExecuteQuery(sql, []);
      var rows = selectQuery.rows;
      for (let i = 0; i < rows.length; i++) {
        var item = rows.item(i);
        categories.push(new Category(item.categoryId, item.name, item.type, item.image, item.count, item.parent))
      }
      return categories;
    }

    async getCategories(parentId: number) {
      let categories = [];
      let sql = `SELECT * FROM category WHERE parent = ${parentId} ORDER BY position ASC`;
      let selectQuery: any = await this.ExecuteQuery(sql, []);
      var rows = selectQuery.rows;
      for (let i = 0; i < rows.length; i++) {
        var item = rows.item(i);
        categories.push(new Category(item.categoryId, item.name, item.type, item.image, item.count, item.perent))
      }
      return categories;
    }

    async addPost(categoryId:number, post: Post){
        let sql = `INSERT INTO post ( postId, categoryId, title, content ) VALUES (${post.getId}, ${categoryId}, '${post.title}', '${post.content}')`
        this.ExecuteQuery(sql, [])
          .catch((error) => {
            console.log(error)
        });
    }

    async getPosts(categoryId: number) {
      let posts = [];
      let sql = `SELECT * FROM post WHERE categoryId = ${categoryId} ORDER BY id DESC`;
      let selectQuery: any = await this.ExecuteQuery(sql, []);
      var rows = selectQuery.rows;
      for (let i = 0; i < rows.length; i++) {
        var item = rows.item(i);
        posts.push(new Post(item.id, categoryId, item.title, item.content))
      }
      return posts;
    }

    async getPost(postId: number) {
      let posts = [];
      let sql = 'SELECT * FROM post WHERE id = ' + postId;
      let selectQuery: any = await this.ExecuteQuery(sql, []);
      var rows = selectQuery.rows;
      for (let i = 0; i < rows.length; i++) {
        var item = rows.item(i);
        posts.push(new Post(item.id, postId, item.title, item.content))
      }
    return posts[0];
  }
}