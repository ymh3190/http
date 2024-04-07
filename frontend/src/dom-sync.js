import { readFileSync, readdirSync, writeFileSync } from "fs";

(() => {
  if (!Boolean(process.env.WATCH)) {
    return;
  }

  const hierarchy = [];

  const viewsPath = process.cwd() + "/views";
  for (const dir of readdirSync(viewsPath)) {
    hierarchy.push({
      primary: dir,
      path: viewsPath + `/${dir}`,
      files: [],
    });
  }

  for (const { primary, path, files } of hierarchy) {
    if (primary) {
      const dirs = readdirSync(path);
      for (const dir of dirs) {
        if (dir.match(/.ejs$/)) {
          const ejs = dir;
          files.push(ejs);
          continue;
        }

        hierarchy.push({ secondary: dir, path: path + `/${dir}`, files: [] });
      }
    }
  }

  for (const { secondary, path, files } of hierarchy) {
    if (secondary) {
      const dirs = readdirSync(path);
      for (const dir of dirs) {
        if (dir.match(/.ejs$/)) {
          const ejs = dir;
          files.push(ejs);
        }
      }
    }
  }

  // const idClassExp = /id=('|")\w+('|")\sclass=('|")\w+/g;
  // const strExp = /('|")\w+/;
  // const includeExp = /<%-\sinclude\(('|")\.\.\/components\/.+(\s+.+)/g;

  let pages = "export const pageDOMs = {};\n";
  let forms = "export const formDOMs = {};\n";
  let divs = "export const divDOMs = {};\n";

  let inputs = "export const inputDOMs = {};\n";
  let selects = "export const selectDOMs = {};\n";
  let textareas = "export const textareaDOMs = {};\n";
  let checkboxes = "export const checkboxDOMs = {};\n";

  let buttons = "export const btnDOMs = {};\n";
  let icons = "export const iconDOMs = {};\n";

  let partialDOMs = "export const partialDOMs = {};\n";

  for (const { primary, path, files } of hierarchy) {
    if (primary === "pages") {
      for (const page of files) {
        const file = readFileSync(path.concat("/", page), "utf-8");

        if (file.match(/<\w+\sid=('|")\w+('|")\sclass=('|")\w+/g)) {
          const doms = file.match(/<\w+\sid=('|")\w+('|")\sclass=('|")\w+/g);
          for (const dom of doms) {
            if (dom.startsWith("<section")) {
              const [id, className] = dom
                .match(/('|")\w+/g)
                .map((str) => str.replace(/('|")/, ""));
              const property = `pageDOMs['${id}-${className}']`;
              const value = `document.querySelector('section#${id}.${className}')`;
              pages += `${property}=${value};\n`;
              continue;
            }

            if (dom.startsWith("<form")) {
              const [id, className] = dom
                .match(/('|")\w+/g)
                .map((str) => str.replace(/('|")/, ""));
              const property = `formDOMs['${id}-${className}']`;
              const value = `document.querySelector('form#${id}.${className}')`;
              forms += `${property}=${value};\n`;
              continue;
            }

            if (dom.startsWith("<div")) {
              const [id, className] = dom
                .match(/('|")\w+/g)
                .map((str) => str.replace(/('|")/, ""));
              const property = `divDOMs['${id}-${className}']`;
              const value = `document.querySelector('div#${id}.${className}')`;
              divs += `${property}=${value};\n`;
              continue;
            }
          }
        }

        if (file.match(/<%-\sinclude\(('|")\.\.\/.+/g)) {
          const doms = file.match(/<%-\sinclude\(('|")\.\.\/.+/g);
          for (const dom of doms) {
            if (dom.includes("input")) {
              let id, inHtml;

              if (dom.match(/id:\s?('|")\w+('|")/)) {
                [id] = dom
                  .match(/id:\s?('|")\w+('|")/g)
                  .map((str) => str.split(":")[1].trim().replace(/('|")/g, ""));
              }
              if (dom.match(/inHtml:\s?('|")\w+('|")/)) {
                [inHtml] = dom
                  .match(/inHtml:\s?('|")\w+('|")/g)
                  .map((str) => str.split(":")[1].trim().replace(/('|")/g, ""));
              }

              if (id && inHtml) {
                const property = `inputDOMs['${id}-${inHtml}']`;
                const value = `document.querySelector('input#${id}.${inHtml}')`;
                inputs += `${property}=${value}\n`;
              }
              continue;
            }

            if (dom.includes("select")) {
              let id, inHtml;

              if (dom.match(/id:\s?('|")\w+('|")/)) {
                [id] = dom
                  .match(/id:\s?('|")\w+('|")/g)
                  .map((str) => str.split(":")[1].trim().replace(/('|")/g, ""));
              }
              if (dom.match(/inHtml:\s?('|")\w+('|")/)) {
                [inHtml] = dom
                  .match(/inHtml:\s?('|")\w+('|")/g)
                  .map((str) => str.split(":")[1].trim().replace(/('|")/g, ""));
              }

              if (id && inHtml) {
                const property = `selectDOMs['${id}-${inHtml}']`;
                const value = `document.querySelector('select#${id}.${inHtml}')`;
                selects += `${property}=${value}\n`;
              }
              continue;
            }

            if (dom.includes("textarea")) {
              let id, inHtml;

              if (dom.match(/id:\s?('|")\w+('|")/)) {
                [id] = dom
                  .match(/id:\s?('|")\w+('|")/g)
                  .map((str) => str.split(":")[1].trim().replace(/('|")/g, ""));
              }
              if (dom.match(/inHtml:\s?('|")\w+('|")/)) {
                [inHtml] = dom
                  .match(/inHtml:\s?('|")\w+('|")/g)
                  .map((str) => str.split(":")[1].trim().replace(/('|")/g, ""));
              }

              if (id && inHtml) {
                const property = `textareaDOMs['${id}-${inHtml}']`;
                const value = `document.querySelector('textarea#${id}.${inHtml}')`;
                textareas += `${property}=${value}\n`;
              }
              continue;
            }

            if (dom.includes("checkbox")) {
              let id, inHtml;

              if (dom.match(/id:\s?('|")\w+('|")/)) {
                [id] = dom
                  .match(/id:\s?('|")\w+('|")/g)
                  .map((str) => str.split(":")[1].trim().replace(/('|")/g, ""));
              }
              if (dom.match(/inHtml:\s?('|")\w+('|")/)) {
                [inHtml] = dom
                  .match(/inHtml:\s?('|")\w+('|")/g)
                  .map((str) => str.split(":")[1].trim().replace(/('|")/g, ""));
              }

              if (id && inHtml) {
                const property = `checkboxDOMs['${id}-${inHtml}']`;
                const value = `document.querySelector('input#${id}.${inHtml}')`;
                checkboxes += `${property}=${value}\n`;
              }
              continue;
            }

            if (dom.includes("button")) {
              let id, inHtml;

              if (dom.match(/id:\s?('|")\w+('|")/)) {
                [id] = dom
                  .match(/id:\s?('|")\w+('|")/g)
                  .map((str) => str.split(":")[1].trim().replace(/('|")/g, ""));
              }
              if (dom.match(/inHtml:\s?('|")\w+('|")/)) {
                [inHtml] = dom
                  .match(/inHtml:\s?('|")\w+('|")/g)
                  .map((str) => str.split(":")[1].trim().replace(/('|")/g, ""));
              }

              if (id && inHtml) {
                const property = `btnDOMs['${id}-${inHtml}']`;
                const value = `document.querySelector('button#${id}.${inHtml}')`;
                const icon = `document.querySelector('button#${id}.${inHtml} > i')`;
                buttons += `${property}=${value}\n`;
                icons += `iconDOMs['${id}-${inHtml}']=${icon}\n`;
              }
              continue;
            }
          }
        }
      }
    }

    if (primary === "partials") {
      for (const partial of files) {
        const file = readFileSync(path.concat("/", partial), "utf-8");
        console.log(file);
      }
    }
  }

  writeFileSync(
    process.cwd() + "/client/js/dom.js",
    pages +
      forms +
      divs +
      inputs +
      selects +
      textareas +
      checkboxes +
      buttons +
      icons +
      partialDOMs
  );
})();
