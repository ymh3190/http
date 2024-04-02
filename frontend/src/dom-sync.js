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

  const idClassExp = /id=('|")\w+('|")\sclass=('|")\w+/g;
  const strExp = /('|")\w+/;
  const includeExp = /<%-\sinclude\(('|")\.\.\/components\/.+(\s+.+)/g;

  let pages = "export const pageDOMs = {};\n";
  let forms = "export const formDOMs = {};\n";
  let divs = "export const divDOMs = {};\n";
  let selects = "export const selectDOMs = {};\n";
  let inputs = "export const inputDOMs = {};\n";
  let buttons = "export const btnDOMs = {};\n";
  let icons = "export const iconDOMs = {};\n";
  let partials = "";

  for (const { primary, path, files } of hierarchy) {
    if (primary === "pages") {
      for (const page of files) {
        const file = readFileSync(path.concat("/", page), "utf-8");

        if (file.match(/<\w+\sid=('|")\w+('|")\sclass=('|")\w+/g)) {
          const doms = file.match(/<\w+\sid=('|")\w+('|")\sclass=('|")\w+/g);
          for (const dom of doms) {
            if (dom.startsWith("<section")) {
              let [id, className] = dom.match(/"\w+/g);
              id = id.replace(/"/, "");
              className = className.replace(/"/, "");
              const property = `pageDOMs['${id}-${className}']`;
              const value = `document.querySelector('section#${id}.${className}')`;
              pages += `${property}=${value};\n`;
              continue;
            }

            if (dom.startsWith("<form")) {
              let [id, className] = dom.match(/"\w+/g);
              id = id.replace(/"/, "");
              className = className.replace(/"/, "");
              const property = `formDOMs['${id}-${className}']`;
              const value = `document.querySelector('form#${id}.${className}')`;
              forms += `${property}=${value};\n`;
              continue;
            }

            if (dom.startsWith("<div")) {
              let [id, className] = dom.match(/"\w+/g);
              id = id.replace(/"/, "");
              className = className.replace(/"/, "");
              const property = `divDOMs['${id}-${className}']`;
              const value = `document.querySelector('div#${id}.${className}')`;
              divs += `${property}=${value};\n`;
              continue;
            }
          }
        }

        if (file.match(/<%-\sinclude\(('|")\.\.\/.+(\s+.+)/g)) {
          const doms = file.match(/<%-\sinclude\(('|")\.\.\/.+(\s+.+)/g);
          for (const dom of doms) {
            const dot2Path = dom.match(/('|")\.\.\/\w+\/\w+/).join("");
            // console.log(dot2Path.replace(/('|")\.\.\//, "").split("/"));
            if (dom.match(/name:\s('|")\w+('|")/g)) {
              const names = dom.match(/name:\s('|")\w+('|")/g);
              for (const name of names) {
                // console.log(name.split(" ")[1].replace(/('|")/g, ""));
              }
              continue;
            }

            if (dom.match(/inHtml:\s('|")\w+('|")/g)) {
              const inHtmls = dom.match(/inHtml:\s('|")\w+('|")/g);
              for (const inHtml of inHtmls) {
                // console.log(inHtml.split(" ")[1].replace(/('|")/g, ""));
              }
            }
          }
        }
      }
    }
  }

  writeFileSync(process.cwd() + "/client/js/dom-sub.js", pages + forms + divs);
})();
