const turkishPages = [
  "https://goit.global/tr/",
  "https://goit.global/tr/courses/",
  "https://goit.global/tr/contact/",
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
          const text = el.textContent.trim();
          if (text && cyrillicRegex.test(text)) {
            found.push({
              tag: el.tagName.toLowerCase(),
              text: text.slice(0, 50), // показуємо перші 50 символів
            });

            // Підсвічуємо знайдений елемент червоною рамкою
            el.style.border = "2px solid red";
          }
        });

        if (found.length > 0) {
          const report = found.map((f) => `<${f.tag}>: "${f.text}"`).join("\n");
          throw new Error(`На сторінці ${url} знайдено кирилицю:\n${report}`);
        }
      });
    });
  });
});
