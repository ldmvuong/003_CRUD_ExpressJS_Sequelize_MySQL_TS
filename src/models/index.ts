import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import configJson from "../config/config.json";

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config: any = (configJson as any)[env];
const db: Record<string, any> = {};

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] as string, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// chỉ lấy .ts/.js, bỏ qua file test, d.ts, map, và chính index.*
fs.readdirSync(__dirname)
  .filter((file) => {
    if (file.startsWith(".")) return false;
    if (file === basename) return false;
    const ext = path.extname(file);
    if (![".ts", ".js"].includes(ext)) return false;
    if (file.endsWith(".test.ts") || file.endsWith(".test.js")) return false;
    if (file.endsWith(".d.ts")) return false;
    return true;
  })
  .forEach((file) => {
    const full = path.join(__dirname, file);
    const mod = require(full);
    const factory = mod?.default ?? mod; // hỗ trợ cả export default và module.exports
    if (typeof factory !== "function") {
      // bỏ qua file không phải model factory
      return;
    }
    const model = factory(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (typeof db[modelName].associate === "function") {
    db[modelName].associate(db);
  }
});

(db as any).sequelize = sequelize;
(db as any).Sequelize = Sequelize;

export default db;
