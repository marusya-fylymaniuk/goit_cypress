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

// Функція для перевірки видимості елемента
function isVisible(el) {
  if (!el) return false;

  const style = window.getComputedStyle(el);

  // Базові CSS-властивості
  if (
    style.display === "none" ||
    style.visibility === "hidden" ||
    style.opacity === "0"
  ) {
    return false;
  }

  // Якщо елемент не має геометрії
  if (el.offsetParent === null && el.getClientRects().length === 0) {
    return false;
  }

  // ARIA-атрибут
  if (el.getAttribute("aria-hidden") === "true") {
    return false;
  }

  // Класи утиліти
  const classList = el.classList;
  if (classList.contains("hidden") || classList.contains("sr-only")) {
    return false;
  }

  return true;
}

describe("Перевірка турецької локалі на кирилицю", () => {
  const cyrillicRegex = /[А-Яа-яЁёЇїІіЄєҐґ]+/g;

  turkishPages.forEach((url) => {
    it(`Сторінка ${url} не повинна містити кириличних символів`, () => {
      cy.visit(url);

      cy.document().then((doc) => {
        const elements = doc.querySelectorAll("body *");
        let found = [];

        elements.forEach((el) => {
          if (!isVisible(el)) return; // ✅ перевіряємо тільки видимі

          // Текст
          const text = el.textContent.trim();
          if (text) {
            const matches = text.match(cyrillicRegex);
            if (matches) {
              found.push({
                tag: el.tagName.toLowerCase(),
                type: "textContent",
                text: text.slice(0, 50),
                count: matches.length,
                matches: matches.join(""),
              });
            }
          }

          // Атрибути alt, title, description
          ["alt", "title", "description"].forEach((attr) => {
            const val = el.getAttribute(attr);
            if (val) {
              const matches = val.match(cyrillicRegex);
              if (matches) {
                found.push({
                  tag: el.tagName.toLowerCase(),
                  type: attr,
                  text: val.slice(0, 50),
                  count: matches.length,
                  matches: matches.join(""),
                });
              }
            }
          });
        });

        if (found.length > 0) {
          const report = found
            .map(
              (f, idx) =>
                `${idx + 1}. <${f.tag}> [${f.type}] (${
                  f.count
                } кирил. символів): "${f.text}"\n   Знайдені символи: "${
                  f.matches
                }"`
            )
            .join("\n");
          throw new Error(`На сторінці ${url} знайдено кирилицю:\n${report}`);
        }
      });
    });
  });
});
