import { readFileSync, writeFileSync } from "fs";

if (Boolean(process.env.WATCH)) {
  const tables = readFileSync(process.cwd() + "/src/db.js")
    .toString()
    .match(/\w+\sextends/g)
    .map((str) => str.split(" ")[0]);

  let statement = "import {";
  for (let i = 0; i < tables.length; i++) {
    if (i !== tables.length - 1) {
      statement += ` ${tables[i]},`;
      continue;
    }
    statement += ` ${tables[i]} } from "./db.js";\n`;
    statement += "(async () => {\n";
  }

  for (let i = 0; i < tables.length; i++) {
    statement += `${tables[i]}.table = ${tables[i]}.getTable();\n`;
    statement += `${tables[i]}.columns = await ${tables[i]}.getColumns();\n`;
    statement += `${tables[i]}.asColumns = ${tables[i]}.toAsColumn();\n`;
    statement += `${tables[i]}.dateFormat = ${tables[i]}.formatDate();\n`;
    statement += `${tables[i]}.enums = ${tables[i]}.getEnums();\n`;
    if (i === tables.length - 1) {
      statement += `})();`;
    }
  }
  writeFileSync(process.cwd() + "/src/db-sub.js", statement);
}
