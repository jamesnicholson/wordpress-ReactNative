import SQLite from 'react-native-sqlite-storage'
import Category from '../models/category'
export default class Database {
    db: any = SQLite.openDatabase("e-ina.db", "1.0", "e-ina Database", 200000);
    constructor(){
        SQLite.DEBUG = false;
        SQLite.enablePromise(true);
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

    async createTables() {
      console.log("Creating Tables");
      this.ExecuteQuery("CREATE TABLE IF NOT EXISTS category (id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(16))", []);
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
  }