import { writeFileSync, existsSync } from "fs";
import "dotenv/config";
if (
  Boolean(process.env.WATCH) &&
  !existsSync(process.cwd() + "/src/db-sub.js")
) {
  writeFileSync(process.cwd() + "/src/db-sub.js", "");
}

import mysql from "mysql2/promise";
import util from "./util";

class MySQLAPI {
  static pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

  async connect() {
    (await MySQLAPI.pool.getConnection()).release();
    console.log(`Connected to DB`);
  }

  static getTable() {
    let name = "";
    for (let i = 0; i < this.name.length; i++) {
      if (this.name[i] === this.name[i].toLowerCase()) {
        name += this.name[i];
        continue;
      }
      if (i > 0) {
        name += `_${this.name[i].toLowerCase()}`;
        continue;
      }
      name += this.name[i].toLowerCase();
    }
    return name;
  }

  static async getColumns() {
    const columns = {};
    const sql = `SHOW COLUMNS FROM ${this.table}`;
    const [result] = await MySQLAPI.pool.execute(sql);
    for (const column of result) {
      columns[column.Field] = column.Type;
    }
    return columns;
  }

  static formatDate() {
    const dateTimes = [];

    for (const [key, value] of Object.entries(this.columns)) {
      if (value === "datetime") {
        dateTimes.push(key);
      }
    }

    let query = "";
    const format = "%Y-%m-%d %H:%i:%s";
    for (let i = 0; i < dateTimes.length; i++) {
      const date = `DATE_FORMAT(${dateTimes[i]}, '${format}') `;
      if (i < dateTimes.length - 1) {
        query = query.concat(date, `AS ${dateTimes[i]}, `);
        continue;
      }
      query = query.concat(date, `AS ${dateTimes[i]}`);
    }
    return query;
  }

  static getEnums() {
    const enums = {};
    for (const [key, value] of Object.entries(this.columns)) {
      if (value.startsWith("enum")) {
        const types = value.match(/('|")[a-zㄱ-힣]+/g).map((type) => {
          return type.replace(/('|")/, "");
        });
        enums[key] = types;
      }
    }
    return enums;
  }

  /**
   *
   * @param {{}} filter
   */
  static async createByManualId(filter) {
    let sql = `INSERT INTO ${this.table}(`;
    const keys = Object.keys(filter);
    for (let i = 0; i < keys.length; i++) {
      if (i < keys.length - 1) {
        sql = sql.concat(keys[i], ", ");
        continue;
      }
      sql = sql.concat(keys[i], ") VALUES(");
    }
    for (let i = 0; i < keys.length; i++) {
      if (i < keys.length - 1) {
        sql = sql.concat("?, ");
        continue;
      }
      sql = sql.concat("?)");
    }
    const values = Object.values(filter);
    await MySQLAPI.pool.execute(sql, values);
  }

  /**
   *
   * @param {{}} filter
   * @param {{} | null} options
   */
  static async create(filter, options) {
    let sql = `INSERT INTO ${this.table}(`;
    // let sql = `INSERT INTO ${this.table}(`.concat("id, ");
    const keys = Object.keys(filter);
    for (let i = 0; i < keys.length; i++) {
      if (i < keys.length - 1) {
        sql = sql.concat(keys[i], ", ");
        continue;
      }
      sql = sql.concat(keys[i], ") VALUES(");
      // sql = sql.concat(keys[i], ") VALUES(").concat("?, ");
    }
    for (let i = 0; i < keys.length; i++) {
      if (i < keys.length - 1) {
        sql = sql.concat("?, ");
        continue;
      }
      sql = sql.concat("?)");
    }

    const values = Object.values(filter);
    // const id = util.createId();
    // const values = [id, ...Object.values(filter)];

    if (!options) {
      await MySQLAPI.pool.execute(sql, values);
      return;
    }

    const [result] = await MySQLAPI.pool.execute(sql, values);
    for (const [key, value] of Object.entries(options)) {
      if (key === "new" && value) {
        const sql = `SELECT *, ${this.dateFormat} FROM ${this.table} WHERE id = ?`;
        const [[newObj]] = await MySQLAPI.pool.execute(sql, [result.insertId]);
        return newObj;
      }
    }
  }

  /**
   *
   * @param {{}} filter
   * @param {{} | string | null} projection
   */
  static async select(filter, projection) {
    const keys = Object.keys(filter);
    if (!keys.length) {
      let sql = `SELECT *, ${this.dateFormat} FROM ${this.table}`;

      if (!projection) {
        const [result] = await MySQLAPI.pool.execute(sql);
        return result;
      }

      if (typeof projection === "string" && projection.startsWith("-")) {
        const column = projection.replace("-", "");
        const [result] = await MySQLAPI.pool.execute(sql);
        return result.map((row) => {
          delete row[column];
          return row;
        });
      }

      return this.find(Object.entries(projection), { sql });
    }

    const values = Object.values(filter);

    let sql = `SELECT *, ${this.dateFormat} FROM ${this.table} WHERE `;
    for (let i = 0; i < keys.length; i++) {
      if (i < keys.length - 1) {
        if (keys[i] === "created_at") {
          const [start, end] = values[i];
          sql += `${keys[i]} BETWEEN '${start}' AND '${end}' AND `;
          continue;
        }

        if (values[i].match(/%/)) {
          sql = sql.concat(keys[i], ` LIKE ? AND `);
          continue;
        }

        sql = sql.concat(keys[i], " = ? AND ");
        continue;
      }

      if (keys[i] === "created_at") {
        const [start, end] = values[i];
        sql += `${keys[i]} BETWEEN '${start}' AND '${end}'`;
        break;
      }

      if (values[i].match(/%/)) {
        sql = sql.concat(keys[i], ` LIKE ?`);
        break;
      }

      sql = sql.concat(keys[i], " = ?");
    }

    if (!projection) {
      const [result] = await MySQLAPI.pool.execute(sql, values);
      return result;
    }

    return this.find(Object.entries(projection), { sql, values });
  }

  /**
   *
   * @param {string} id
   * @param {string | null} projection
   */
  static async selectById(id, projection) {
    const sql = `SELECT *, ${this.dateFormat} FROM ${this.table} WHERE id = ?`;

    if (!projection) {
      const [[result]] = await MySQLAPI.pool.execute(sql, [id]);
      return result;
    }

    const column = projection.replace("-", "");
    const [[result]] = await MySQLAPI.pool.execute(sql, [id]);
    delete result[column];
    return result;
  }

  /**
   *
   * @param {{}} filter
   */
  static async selectOne(filter) {
    const keys = Object.keys(filter);

    let sql = `SELECT * FROM ${this.table} WHERE `;
    for (let i = 0; i < keys.length; i++) {
      if (i < keys.length - 1) {
        sql = sql.concat(keys[i], " = ? AND ");
        continue;
      }
      sql = sql.concat(keys[i], " = ?");
    }

    const values = Object.values(filter);
    const [[result]] = await MySQLAPI.pool.execute(sql, values);
    return result;
  }

  static toAsColumn() {
    const columns = Object.keys(this.columns)
      .map((column) => `${this.table}.${column} AS ${column}`)
      .join(", ");
    return columns;
  }

  /**
   *
   * @param {{}} query
   * @param {{}} filter
   * @param {{}} projection
   * @returns
   */
  static async selectJoin(query, filter, projection) {
    const { tables, columns } = query;

    let sql = "SELECT ";
    for (const [table, column] of Object.entries(columns)) {
      const cols = column.split(" ");
      if (this.table !== table) {
        for (const col of cols) {
          sql += `${table}.${col} AS ${table}_${col}, `;
        }
        continue;
      }
      for (const col of cols) {
        sql += `${table}.${col}, `;
      }
    }

    sql = sql.replace(/,\s$/, " ").concat(`FROM ${this.table} `);
    for (const [table, join] of Object.entries(tables)) {
      sql += `${join} ${table} ON ${this.table}.id = ${table}.${this.table}_id `;
    }

    const keys = Object.keys(filter);
    if (!keys.length) {
      const [result] = await MySQLAPI.pool.execute(sql);
      return result;
    }

    sql += "WHERE ";
    const values = [];
    for (const table of Object.keys(tables)) {
      if (keys.includes(table)) {
        for (const value of Object.values(filter)) {
          for (const [key, word] of Object.entries(value)) {
            values.push(word);
            if (word.match(/%/)) {
              sql += `${table}.${key} LIKE ? AND `;
              continue;
            }
            sql += `${table}.${key} = ? AND `;
          }
        }
      }
    }
    sql = sql.replace(/\sand\s$/i, "");
    const [result] = await MySQLAPI.pool.execute(sql, values);
    return result;
  }

  /**
   *
   * @param {{}} filter
   */
  static async deleteByOne(filter) {
    const keys = Object.keys(filter);

    let sql = `DELETE FROM ${this.table} WHERE `;
    for (let i = 0; i < keys.length; i++) {
      if (i < keys.length - 1) {
        sql = sql.concat(keys[i], " = ? AND");
        continue;
      }
      sql = sql.concat(keys[i], " = ?");
    }
    const values = Object.values(filter);
    await MySQLAPI.pool.execute(sql, values);
  }

  /**
   *
   * @param {string} id
   * @param {{}} filter
   * @param {{} | null} options
   */
  static async updateById(id, filter, options) {
    const keys = Object.keys(filter);

    let sql = `UPDATE ${this.table} SET `;
    for (let i = 0; i < keys.length; i++) {
      if (i < keys.length - 1) {
        sql = sql.concat(keys[i], " = ?,");
        continue;
      }
      sql = sql.concat(keys[i], " = ? WHERE id = ?");
    }

    if (!options) {
      const values = [...Object.values(filter), id];
      await MySQLAPI.pool.execute(sql, values);
      return;
    }

    const values = [...Object.values(filter), id];
    await MySQLAPI.pool.execute(sql, values);
    for (const [key, value] of Object.entries(options)) {
      if (key === "new" && value) {
        const result = await this.selectById(id);
        return result;
      }
    }
  }

  /**
   *
   * @param {string} id
   */
  static async deleteById(id) {
    const sql = `DELETE FROM ${this.table} WHERE id = ?`;
    await MySQLAPI.pool.execute(sql, [id]);
  }

  /**
   *
   * @param {*} args
   * @param {Object} param1
   * @param {string} param1.sql
   * @param {[] | null} param1.values
   * @returns
   */
  static async find(args, { sql, values }) {
    for (let i = 0; i < args.length; i++) {
      const [key, value] = args[i];

      const isOrder = value === "desc" || value === "asc";
      if (!sql.match(/order/i) && isOrder) {
        sql = sql.concat(" ORDER BY ");
      } else if (key === "limit") {
        sql = sql.replace(/,\s$/, "").concat(" LIMIT ");
      }

      if (i < args.length - 1) {
        if (key === "limit") {
          const [start, length] = value;
          sql = sql.concat(`${start}, ${length}, `);
          continue;
        }
        sql = sql.concat(`${key} ${value}, `);
        continue;
      }

      if (key === "limit") {
        const [start, length] = value;
        sql = sql.concat(`${start}, ${length}`);
        break;
      }
      sql = sql.concat(`${key} ${value}`);
    }

    if (values) {
      const [result] = await MySQLAPI.pool.execute(sql, values);
      return result;
    }
    const [result] = await MySQLAPI.pool.execute(sql);
    return result;
  }
}

const mysqlAPI = new MySQLAPI();
export default mysqlAPI;
export class User extends MySQLAPI {}
export class Token extends MySQLAPI {}
export class Image extends MySQLAPI {}
export class Video extends MySQLAPI {}
export class Genre extends MySQLAPI {}
export class Client extends MySQLAPI {}
export class Product extends MySQLAPI {}
export class Commodity extends MySQLAPI {}
export class Tank extends MySQLAPI {}
export class Item extends MySQLAPI {}
