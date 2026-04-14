const turkishPages = [
  "https://goit.global/tr/",
  "https://goit.global/tr/courses/",
  "https://goit.global/tr/reviews/",
  "https://goit.global/tr/articles/",
  // "https://goit.global/tr/contacts/",
  "https://goit.global/tr/terms-of-use/",
  "https://goit.global/tr/privacy-policy/",
  "https://goit.global/tr/newcomers/",
  "https://goit.global/tr/courses/fullstack/",
  "https://goit.global/tr/courses/data-analytics/",
  "https://goit.global/tr/courses/qa/",
  "https://goit.global/tr/courses/cybersecurity/",
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

  // Обробка JavaScript помилок для надійності
  beforeEach(() => {
    cy.on("uncaught:exception", (err) => {
      // Ігноруємо помилки jQuery та інші JavaScript помилки
      if (
        err.message.includes("jquery") ||
        err.message.includes("Syntax error") ||
        err.message.includes("unrecognized expression")
      ) {
        return false;
      }
      return true;
    });
  });

  turkishPages.forEach((url) => {
    it(`Сторінка ${url} не повинна містити кириличних символів`, () => {
      cy.visit(url, {
        failOnStatusCode: false, // Не падати на 404/500
        timeout: 10000, // Збільшений таймаут для повільних сторінок
      });

      cy.document().then((doc) => {
        const elements = doc.querySelectorAll("body *");
        let found = [];

        elements.forEach((el) => {
          if (!isVisible(el)) return; // ✅ перевіряємо тільки видимі
          if (el.closest("[class*='iti__']")) return; // ✅ ігноруємо intl-tel-input dropdown

          // Тільки прямі текстові вузли (без дочірніх елементів)
          const text = Array.from(el.childNodes)
            .filter((node) => node.nodeType === Node.TEXT_NODE)
            .map((node) => node.textContent)
            .join("")
            .trim();
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

          // Атрибути alt, title, description (з безпечною перевіркою)
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
