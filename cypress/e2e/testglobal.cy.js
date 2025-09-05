// describe("Turkish locale sanity check - multiple pages", () => {
//   const pages = [
//     "https://goit.global/tr/",
//     "https://goit.global/tr/courses/",
//     "https://goit.global/tr/about/",
//     "https://goit.global/tr/contact/",
//   ];

//   const cyrillicRegex = /[А-Яа-яЁёІіЇїЄєҐґ]/g;

//   pages.forEach((pageUrl) => {
//     it(`Should not contain Cyrillic characters on ${pageUrl}`, () => {
//       cy.visit(pageUrl);

//       cy.document().then((doc) => {
//         const bodyText = doc.body.innerText;
//         const matches = bodyText.match(cyrillicRegex);

//         if (matches) {
//           throw new Error(
//             `❌ Cyrillic symbols found on page: ${pageUrl}\nSymbols: ${matches.join(
//               ", "
//             )}`
//           );
//         }
//       });

//       // Перевірка alt у картинок
//       cy.get("img[alt]").each(($img) => {
//         const alt = $img.attr("alt");
//         if (alt && cyrillicRegex.test(alt)) {
//           throw new Error(`❌ Cyrillic in <img alt> on ${pageUrl}: "${alt}"`);
//         }
//       });

//       // Перевірка title у тегів
//       cy.get("[title]").each(($el) => {
//         const title = $el.attr("title");
//         if (title && cyrillicRegex.test(title)) {
//           throw new Error(
//             `❌ Cyrillic in title attribute on ${pageUrl}: "${title}"`
//           );
//         }
//       });

//       // Перевірка мета-тегів
//       cy.get("meta").each(($meta) => {
//         const content = $meta.attr("content");
//         if (content && cyrillicRegex.test(content)) {
//           throw new Error(
//             `❌ Cyrillic in <meta> tag on ${pageUrl}: "${content}"`
//           );
//         }
//       });
//     });
//   });
// });
