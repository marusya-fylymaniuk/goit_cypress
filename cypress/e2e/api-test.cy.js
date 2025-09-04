describe("httpbin tests", () => {
  const request = {
    url: "https://httpbin.org/get",
    qs: {
      key: "value",
    },
    failOnStatusCode: false,
  };

  it("response value should be value", () => {
    cy.request(request).then((response) => {
      assert.equal("value", response.body.args.key);
    });
  });
});
