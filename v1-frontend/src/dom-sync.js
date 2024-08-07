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

  let pages = "export const pageDOMs = {};\n";
  let forms = "export const formDOMs = {};\n";
  let divs = "export const divDOMs = {};\n";

  let inputs = "export const inputDOMs = {};\n";
  let selects = "export const selectDOMs = {};\n";
  let textareas = "export const textareaDOMs = {};\n";
  let checkboxes = "export const checkboxDOMs = {};\n";

  let buttons = "export const btnDOMs = {};\n";
  let icons = "export const iconDOMs = {};\n";

  let partials = "export const partialDOMs = {};\n";

  let templates = "export const tempDOMs = {};\n";
  let popups = "export const popupDOMs = {};\n";

  const getDOMs = (regExp, file) => {
    return file.match(new RegExp(regExp, "g"));
  };

  const getIdClassName = (dom) => {
    const [id, className] = dom
      .match(/('|")\w+/g)
      .map((str) => str.replace(/('|")/, ""));
    return [id, className];
  };

  const getId = (dom) => {
    const id = dom
      .match(/id:\s?('|")\w+('|")/g)
      .map((str) => str.split(":")[1].trim().replace(/('|")/g, ""));
    return id;
  };

  const getInhtml = (dom) => {
    const id = dom
      .match(/inHtml:\s?('|")\w+('|")/g)
      .map((str) => str.split(":")[1].trim().replace(/('|")/g, ""));
    return id;
  };

  const idClassExp = /<\w+\sid=('|")\w+('|")\sclass=('|")\w+/;
  const includeExp = /<%-\sinclude\(('|")\.\.\/.+/;
  const idExp = /id:\s?('|")\w+('|")/;
  const inHtmlExp = /inHtml:\s?('|")\w+('|")/;

  for (const { primary, path, files } of hierarchy) {
    if (primary === "pages") {
      for (const page of files) {
        const file = readFileSync(path.concat("/", page), "utf-8");

        if (file.match(idClassExp)) {
          const doms = getDOMs(idClassExp, file);
          for (const dom of doms) {
            if (dom.startsWith("<section")) {
              const [id, className] = getIdClassName(dom);
              const property = `pageDOMs['${id}-${className}']`;
              const value = `document.querySelector('section#${id}.${className}')`;
              pages += `${property}=${value};\n`;
              continue;
            }

            if (dom.startsWith("<form")) {
              const [id, className] = getIdClassName(dom);
              const property = `formDOMs['${id}-${className}']`;
              const value = `document.querySelector('form#${id}.${className}')`;
              forms += `${property}=${value};\n`;
              continue;
            }

            if (dom.startsWith("<div")) {
              const [id, className] = getIdClassName(dom);
              const property = `divDOMs['${id}-${className}']`;
              const value = `document.querySelector('div#${id}.${className}')`;
              divs += `${property}=${value};\n`;
              continue;
            }
          }
        }

        if (file.match(includeExp)) {
          const doms = getDOMs(includeExp, file);
          for (const dom of doms) {
            if (dom.includes("input")) {
              let id, inHtml;

              if (dom.match(idExp)) {
                id = getId(dom);
              }
              if (dom.match(inHtmlExp)) {
                inHtml = getInhtml(dom);
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

              if (dom.match(idExp)) {
                id = getId(dom);
              }
              if (dom.match(inHtmlExp)) {
                inHtml = getInhtml(dom);
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

              if (dom.match(idExp)) {
                id = getId(dom);
              }
              if (dom.match(inHtmlExp)) {
                inHtml = getInhtml(dom);
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

              if (dom.match(idExp)) {
                id = getId(dom);
              }
              if (dom.match(inHtmlExp)) {
                inHtml = getInhtml(dom);
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

              if (dom.match(idExp)) {
                id = getId(dom);
              }
              if (dom.match(inHtmlExp)) {
                inHtml = getInhtml(dom);
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

            if (dom.includes("row")) {
              continue;
            }

            if (dom.includes("popup")) {
              let id, inHtml;

              if (dom.match(idExp)) {
                id = getId(dom);
              }
              if (dom.match(inHtmlExp)) {
                inHtml = getInhtml(dom);
              }

              if (id && inHtml) {
                const property = `popupDOMs['${id}-${inHtml}']`;
                const value = `document.querySelector('form#${id}.${inHtml}')`;
                popups += `${property}=${value}\n`;
              }
              continue;
            }

            if (dom.includes("controls")) {
              let id, inHtml;

              if (dom.match(idExp)) {
                id = getId(dom);
              }
              if (dom.match(inHtmlExp)) {
                inHtml = getInhtml(dom);
              }

              if (id && inHtml) {
                const property = `tempDOMs['${id}-${inHtml}']`;
                const value = `document.querySelector('template#${id}.${inHtml}')`;
                templates += `${property}=${value}\n`;
              }
              continue;
            }
          }
        }
      }
    }

    if (primary === "components") {
      for (const partial of files) {
        const file = readFileSync(path.concat("/", partial), "utf-8");

        if (file.match(idClassExp)) {
          const doms = getDOMs(idClassExp, file);
          for (const dom of doms) {
            if (dom.startsWith("<form")) {
              const [id, className] = getIdClassName(dom);
              const property = `formDOMs['${id}-${className}']`;
              const value = `document.querySelector('form#${id}.${className}')`;
              forms += `${property}=${value};\n`;
              continue;
            }
          }
        }

        if (file.match(includeExp)) {
          const doms = getDOMs(includeExp, file);
          for (const dom of doms) {
            if (dom.includes("input")) {
              let id, inHtml;

              if (dom.match(idExp)) {
                id = getId(dom);
              }
              if (dom.match(inHtmlExp)) {
                inHtml = getInhtml(dom);
              }

              if (id && inHtml) {
                const property = `inputDOMs['${id}-${inHtml}']`;
                const value = `document.querySelector('input#${id}.${inHtml}')`;
                inputs += `${property}=${value}\n`;
              }
              continue;
            }

            if (dom.includes("button")) {
              // TODO
              // console.log(dom);
            }
          }
        }
      }
    }

    if (primary === "partials") {
      for (const partial of files) {
        const file = readFileSync(path.concat("/", partial), "utf-8");

        if (file.match(idClassExp)) {
          const doms = getDOMs(idClassExp, file);
          for (const dom of doms) {
            if (dom.startsWith("<form")) {
              const [id, className] = getIdClassName(dom);
              const property = `formDOMs['${id}-${className}']`;
              const value = `document.querySelector('form#${id}.${className}')`;
              forms += `${property}=${value};\n`;
              continue;
            }
          }
        }

        if (file.match(includeExp)) {
          const doms = getDOMs(includeExp, file);
          for (const dom of doms) {
            if (dom.includes("input")) {
              let id, inHtml;

              if (dom.match(idExp)) {
                id = getId(dom);
              }
              if (dom.match(inHtmlExp)) {
                inHtml = getInhtml(dom);
              }

              if (id && inHtml) {
                const property = `inputDOMs['${id}-${inHtml}']`;
                const value = `document.querySelector('input#${id}.${inHtml}')`;
                inputs += `${property}=${value}\n`;
              }
              continue;
            }
          }
        }
      }
    }

    if (primary === "scripts") {
      for (const partial of files) {
        const file = readFileSync(path.concat("/", partial), "utf-8");

        if (file.match(/data-\w+=('|")\w+/)) {
          const doms = file.match(/data-js=('|")\w+/g);
          // console.log(doms, file);
        }
      }
    }

    if (primary === "third-party") {
    }
  }

  for (const { secondary, path, files } of hierarchy) {
    if (secondary) {
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
      partials +
      templates +
      popups
  );
})();
