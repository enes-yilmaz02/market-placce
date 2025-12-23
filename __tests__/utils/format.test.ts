import { formatCurrency, formatDate, truncateText, generateSlug, cn } from "@/lib/utils/format";

describe("formatCurrency", () => {
  it("formats USD correctly", () => {
    expect(formatCurrency(99.99, "USD", "en-US")).toBe("$99.99");
  });

  it("formats EUR correctly", () => {
    expect(formatCurrency(99.99, "EUR", "de-DE")).toContain("99,99");
  });
});

describe("formatDate", () => {
  it("formats date correctly", () => {
    const date = new Date("2025-01-15");
    const formatted = formatDate(date, "en-US");
    expect(formatted).toContain("January");
    expect(formatted).toContain("15");
    expect(formatted).toContain("2025");
  });
});

describe("truncateText", () => {
  it("truncates long text", () => {
    const longText = "This is a very long text that needs to be truncated";
    expect(truncateText(longText, 20)).toBe("This is a very long...");
  });

  it("does not truncate short text", () => {
    const shortText = "Short text";
    expect(truncateText(shortText, 20)).toBe("Short text");
  });
});

describe("generateSlug", () => {
  it("generates slug from text", () => {
    expect(generateSlug("Hello World")).toBe("hello-world");
    expect(generateSlug("Product Name 123")).toBe("product-name-123");
  });

  it("handles special characters", () => {
    expect(generateSlug("Hello, World!")).toBe("hello-world");
  });
});

describe("cn", () => {
  it("combines class names", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });

  it("filters falsy values", () => {
    expect(cn("class1", false, null, undefined, "class2")).toBe("class1 class2");
  });
});
