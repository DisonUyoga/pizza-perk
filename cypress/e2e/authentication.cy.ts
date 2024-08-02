import { setupClerkTestingToken } from "@clerk/testing/cypress";
describe("authentication", () => {
  it("sign in", () => {
    setupClerkTestingToken();
    cy.visit(`/`);
    cy.visit("/sign-in");
    cy.clerkSignIn({
      strategy: "phone_code",
      identifier: "+15555550100",
    });
    // cy.url().should("include", "/supabaseauth");

    // cy.url().should("include", "/");
  });
});
