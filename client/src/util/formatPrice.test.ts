import { formatPrice } from "./formatPrice";
import { expect } from "@jest/globals"; // avoid clash with cypress expect method

describe("format price", () => {
  it("formats a number to the default when not passed any formatting options", () => {
    expect(formatPrice(10)).toEqual("$10.00");
  });

  it("formats a number to the specified locale and currency", () => {
    expect(formatPrice(10, { locale: "en-GB", currency: "GBP" })).toEqual(
      "£10.00"
    );
  });
});
