import { validatePassword } from "./inputValidation";
describe("validatePassword", () => {
    test("validatePassword returns true for valid password", () => {
        const password = "password";
        expect(validatePassword(password)).toBe(true);
    });
});
