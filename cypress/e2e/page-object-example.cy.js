import { Login } from "../pages/Login";

const loginPage = new Login();
describe("Page obj example", () => {
  it("Login page", () => {
    //     cy.visit("https://www.edu.goit.global/uk/account/login");
    //     cy.get(".next-c1vj7d.e168p23h3").should("be.visible");
    //     // cy.get('.next-10stgr7 > .next-c1vj7d').should("be.visible") питання до Роми, як краще стукатись до елемента
    //     cy.get(".next-c1vj7d.e168p23h3").should("have.text", "Вхід");
    //     cy.get('#user_email').should("be.visible");
    //     cy.get("#user_password").should("be.visible");
    //     cy.contains('Увійти').should("be.visible");
    //     cy.get('[href="/uk/account/password/restore"]').should("have.text", "Не пам'ятаю пароль")
    // })

    // visit page
    loginPage.navigate();
    // check title
    loginPage.validateLoginTitle();
    // check inputs
    loginPage.validateInputs();
    // check button
    loginPage.validateButton();
    // check link
    loginPage.validatePasswordLink();
  });
});
