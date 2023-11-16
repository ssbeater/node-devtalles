import { emailTemplate } from "../../src/js-foundation/01-template";

describe("Template", () => {
  test("email template should contain a greeting", () => {
    expect(emailTemplate).toContain("Hi, ");
  });

  test("email template should contain a name and order id", () => {
    expect(emailTemplate).toContain("{{name}}");
    expect(emailTemplate).toContain("{{orderId}}");
  });
});
