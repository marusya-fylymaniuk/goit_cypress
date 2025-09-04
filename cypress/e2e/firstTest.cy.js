// describe("Наш перший блок тестів", () => {
//   it("Тест відвідування сайту LMS", () => {
// // cypress code
//       cy.visit("https://www.edu.goit.global/account/login");
//       cy.get("#user_email").type("user888@gmail.com");
//       cy.get('#user_password').type("1234567890");
//       cy.get('[type="submit"]').should("have.text", "Log in");
//       cy.get('.eckniwg2').click();
//       cy.get('[id="go-to-the-course-homepage-widget"]').scrollIntoView().should("be.visible")
//   });
// });
describe("login test", () => {
  it("admin login", () => {
    cy.visit("https://www.edu.goit.global/account/login");

    cy.signIn("user888@gmail.com", "1234567890");
  });

  it("user login", () => {
    cy.visit("https://www.edu.goit.global/account/login");

    cy.signIn("nadia.tsomko.98@gmail.com", "Nadia_Tsomko78");
  });

  it("manager login", () => {
    cy.visit("https://www.edu.goit.global/account/login");

    cy.signIn("mrdusty@duniakeliling.com", "mrdusty@duniakeliling.com");
  });
});
