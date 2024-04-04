import { writeFileSync, existsSync } from "fs";

import "dotenv/config";
import mysql from "mysql2/promise";
if (
  Boolean(process.env.WATCH) &&
  !existsSync(process.cwd() + "/src/db-sub.js")
) {
  writeFileSync(process.cwd() + "/src/db-sub.js", "");
}

import * as CustomError from "./error";
import util from "./util";
import perf from "./perf";

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
      if (this.name[i] !== this.name[i].toUpperCase()) {
        name += this.name[i];
        continue;
      }
      if (i !== 0) {
        name += `_${this.name[i].toLowerCase()}`;
        continue;
      }
      name += this.name[i].toLowerCase();
    }
    return name;
  }

  static async getColumns() {
    const sql = `SHOW COLUMNS FROM ${this.table}`;
    const [result] = await MySQLAPI.pool.execute(sql);
    return result;
  }

  static async formatDate() {
    const dateTimes = [];
    for (const column of await this.getColumns()) {
      if (column.Type === "datetime") {
        dateTimes.push(column.Field);
      }
    }

    let query = "";
    const format = "%Y-%m-%d %H:%i:%s";
    for (let i = 0; i < dateTimes.length; i++) {
      const date = `DATE_FORMAT(${dateTimes[i]}, '${format}')`;
      if (i !== dateTimes.length - 1) {
        query = query.concat(date, ` AS ${dateTimes[i]}, `);
        continue;
      }
      query = query.concat(date, ` AS ${dateTimes[i]}`);
    }
    return query;
  }

  static async getEnums() {
    const enums = {};
    for (const column of await this.getColumns()) {
      if (column.Type.startsWith("enum")) {
        const types = column.Type.match(/('|")[a-zㄱ-힣]+/g).map((type) => {
          return type.replace(/('|")/, "");
        });
        enums[column.Field] = types;
      }
    }
    return enums;
  }

  /**
   *
   * @param {{}} filter
   */
  static async createByManualId(filter) {
    if (!filter) {
      throw new CustomError.BadRequestError("Provide filter");
    }

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
    if (!filter) {
      throw new CustomError.BadRequestError("Provide filter");
    }

    let sql = `INSERT INTO ${this.table}(`.concat("id, ");
    const keys = Object.keys(filter);
    for (let i = 0; i < keys.length; i++) {
      if (i < keys.length - 1) {
        sql = sql.concat(keys[i], ", ");
        continue;
      }
      sql = sql.concat(keys[i], ") VALUES(").concat("?, ");
    }
    for (let i = 0; i < keys.length; i++) {
      if (i < keys.length - 1) {
        sql = sql.concat("?, ");
        continue;
      }
      sql = sql.concat("?)");
    }

    const id = util.createId();
    const values = [id, ...Object.values(filter)];

    if (!options) {
      await MySQLAPI.pool.execute(sql, values);
      return;
    }

    await MySQLAPI.pool.execute(sql, values);
    for (const [key, value] of Object.entries(options)) {
      if (key === "new" && value) {
        const sql = `SELECT *, ${this.dateFormat} FROM ${this.table} WHERE id = ?`;
        const [[result]] = await MySQLAPI.pool.execute(sql, [id]);
        return result;
      }
    }
  }

  /**
   *
   * @param {{}} filter
   * @param {{} | string | null} projection
   */
  static async select(filter, projection) {
    if (!filter) {
      throw new CustomError.BadRequestError("Provide filter");
    }

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

    let sql = `SELECT *, ${this.dateFormat} FROM ${this.table} WHERE`;
    for (let i = 0; i < keys.length; i++) {
      if (i < keys.length - 1) {
        if (keys[i] === "created_at") {
          const [start, end] = values[i];
          sql += ` ${keys[i]} BETWEEN '${start}' AND '${end}' AND`;
          continue;
        }

        if (values[i].match(/\%/)) {
          sql = sql.concat(" ", `${keys[i]}`, ` LIKE ? AND`);
          continue;
        }

        sql = sql.concat(" ", keys[i], " = ? AND");
        continue;
      }

      if (keys[i] === "created_at") {
        const [start, end] = values[i];
        sql += ` ${keys[i]} BETWEEN '${start}' AND '${end}'`;
        break;
      }

      if (values[i].match(/\%/)) {
        sql = sql.concat(" ", `${keys[i]}`, ` LIKE ?`);
        break;
      }

      sql = sql.concat(" ", keys[i], " = ?");
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
    if (!id) {
      throw new CustomError.BadRequestError("Provide id");
    }

    const sql = `SELECT *, ${this.dateFormat} FROM ${this.table} WHERE id = ?`;

    if (!projection) {
      const [[result]] = await MySQLAPI.pool.execute(sql, [id]);
      return result;
    }

    Object.keys(projection).forEach((key) => {
      if (key) {
        throw new CustomError.BadRequestError("Provide only string");
      }
    });

    if (!projection.startsWith("-")) {
      throw new CustomError.BadRequestError("Starts with -");
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
    if (!filter) {
      throw new CustomError.BadRequestError("Provide filter");
    }

    const keys = Object.keys(filter);
    if (!keys.length) {
      throw new CustomError.BadRequestError("Provide key");
    }

    let sql = `SELECT * FROM ${this.table} WHERE`;
    for (let i = 0; i < keys.length; i++) {
      if (i < keys.length - 1) {
        sql = sql.concat(" ", keys[i], " = ? AND");
        continue;
      }

      sql = sql.concat(" ", keys[i], " = ?");
    }
    const values = Object.values(filter);
    const [[result]] = await MySQLAPI.pool.execute(sql, values);
    return result;
  }

  /**
   *
   * @param {{}} filter
   */
  static async selectOneAndDelete(filter) {
    if (!filter) {
      throw new CustomError.BadRequestError("Provide filter");
    }

    const keys = Object.keys(filter);
    if (!keys.length) {
      throw new CustomError.BadRequestError("Provide key");
    }

    let sql = `DELETE FROM ${this.table} WHERE`;
    for (let i = 0; i < keys.length; i++) {
      if (i < keys.length - 1) {
        sql = sql.concat(" ", keys[i], " = ? AND");
        continue;
      }
      sql = sql.concat(" ", keys[i], " = ?");
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
  static async selectByIdAndUpdate(id, filter, options) {
    if (!id || !filter) {
      throw new CustomError.BadRequestError("Provide id and filter");
    }

    const keys = Object.keys(filter);
    if (!keys.length) {
      throw new CustomError.BadRequestError("Provide key");
    }

    const result = await this.selectById(id);
    if (!result) {
      throw new CustomError.NotFoundError(`${this.name} not found`);
    }

    let sql = `UPDATE ${this.table} SET`;
    for (let i = 0; i < keys.length; i++) {
      if (i < keys.length - 1) {
        sql = sql.concat(" ", keys[i], " = ?,");
        continue;
      }
      sql = sql.concat(" ", keys[i], " = ? WHERE").concat(" ", "id = ?");
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
  static async selectByIdAndDelete(id) {
    if (!id) {
      throw new CustomError.BadRequestError("Provide id");
    }

    const result = await this.selectById(id);
    if (!result) {
      throw new CustomError.NotFoundError(`${this.name} not found`);
    }

    const sql = `DELETE FROM ${this.table} WHERE id = ?`;
    await MySQLAPI.pool.execute(sql, [id]);
  }

  /**
   *
   * @param {*} args
   * @param {Object} param1
   * @param {string} param1.sql
   * @param {[] | null} param1.values
   * @returns {[]}
   */
  static async find(args, { sql, values }) {
    for (let i = 0; i < args.length; i++) {
      const [key, value] = args[i];

      const isOrder = value === "desc" || value === "asc";
      if (!sql.match(/order/i) && isOrder) {
        sql = sql.concat(" ORDER BY");
      } else if (key === "limit") {
        sql = sql.replace(/\,$/, "").concat(" LIMIT");
      }

      if (i !== args.length - 1) {
        if (key === "limit") {
          const [start, length] = value;
          sql = sql.concat(" ", `${start}, ${length},`);
          continue;
        }
        sql = sql.concat(" ", `${key} ${value},`);
        continue;
      }

      if (key === "limit") {
        const [start, length] = value;
        sql = sql.concat(" ", `${start}, ${length}`);
        break;
      }
      sql = sql.concat(" ", `${key} ${value}`);
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
export class Client extends MySQLAPI {}
export class Product extends MySQLAPI {}
export class Commodity extends MySQLAPI {}
export class Tank extends MySQLAPI {}
export class Item extends MySQLAPI {}
