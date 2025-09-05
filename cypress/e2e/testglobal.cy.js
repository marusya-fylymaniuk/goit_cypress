const turkishPages = [
  "https://goit.global/tr/",
  "https://goit.global/tr/courses/",
  "https://goit.global/tr/reviews/",
  "https://goit.global/tr/articles/",
  "https://goit.global/tr/contacts/",
  "https://goit.global/tr/terms-of-use/",
  "https://goit.global/tr/privacy-policy/",
  "https://goit.global/tr/newcomers/",
];

describe("Перевірка турецької локалі на кирилицю", () => {
  const cyrillicRegex = /[А-Яа-яЁёЇїІіЄєҐґ]+/g;

  turkishPages.forEach((url) => {
    it(`Сторінка ${url} не повинна містити кириличних символів`, () => {
      cy.visit(url);

      cy.document().then((doc) => {
        const elements = doc.querySelectorAll("body *");
        let found = [];

        elements.forEach((el) => {
          // Перевірка видимості
          const style = window.getComputedStyle(el);
          const isVisible =
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            style.opacity !== "0" &&
            el.offsetParent !== null &&
            el.getClientRects().length > 0;

          if (!isVisible) return;

          // Перевірка textContent
          const text = el.textContent.trim();
          if (text && cyrillicRegex.test(text)) {
            found.push({
              tag: el.tagName.toLowerCase(),
              type: "textContent",
              text: text.slice(0, 50),
            });
          }

          // Перевірка атрибутів alt, title, description
          ["alt", "title", "description"].forEach((attr) => {
            const val = el.getAttribute(attr);
            if (val && cyrillicRegex.test(val)) {
              found.push({
                tag: el.tagName.toLowerCase(),
                type: attr,
                text: val.slice(0, 50),
              });
            }
          });
        });

        if (found.length > 0) {
          const report = found
            .map((f, idx) => `${idx + 1}. <${f.tag}> [${f.type}]: "${f.text}"`)
            .join("\n");
          throw new Error(`На сторінці ${url} знайдено кирилицю:\n${report}`);
        }
      });
    });
  });
});
