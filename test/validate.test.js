import { describe, expect, test } from "vitest";
import {
  isEmail,
  isLinkedinURL,
  isCompanyName,
  isEmployeeSize,
} from "../lib/validate.js";

describe("Testing isEmail", () => {
  test("testing for a valid email", () => {
    expect(isEmail("contact@leadsync.com")).toBe(true);
  });

  test("testing NA", () => {
    expect(isEmail("NA")).toBe(true);
  });

  test("testing for an invalid email", () => {
    expect(isEmail("hey@phone@book.com")).toBe(false);
  });
});

describe("Testing isLinkedinURL", () => {
  test("testing for a valid linkedin url", () => {
    expect(isLinkedinURL("https://in.linkedin.com/company/google")).toBe(true);
  });

  test("testing for an invalid linkedin url", () => {
    expect(isLinkedinURL("https://in.linked.com/company/facebook")).toBe(false);
  });

  test("testing without http part for incorrect spelling", () => {
    expect(isLinkedinURL("www.linked.com/qualitysoftech")).toBe(false);
  });

  test("testing for valid linkedin without http", () => {
    expect(isLinkedinURL("www.linkedin.com")).toBe(true);
  });
});

describe("Testing isCompanyName", () => {
  test("testing for a alphabetical name", () => {
    expect(isCompanyName("Phleebs")).toBe(true);
  });

  test("testing for an alphanumeric one", () => {
    expect(isCompanyName("e24")).toBe(true);
  });

  test("testing for URL case", () => {
    expect(isCompanyName("e24.ai")).toBe(false);
  });

  test("testing for potential employee-size entry", () => {
    expect(isCompanyName("10-500")).toBe(false);
  });
});

describe("Testing isEmployeeSize", () => {
  test("testing for a alphabetical name", () => {
    expect(isEmployeeSize("10")).toBe(true);
  });

  test("testing for an alphanumeric one", () => {
    expect(isEmployeeSize("10-500")).toBe(true);
  });

  test("testing for URL case", () => {
    expect(isEmployeeSize("100+")).toBe(true);
  });

  test("testing for potential employee-size entry", () => {
    expect(isEmployeeSize("100k")).toBe(true);
  });

  test("testing for potential employee-size entry", () => {
    expect(isEmployeeSize("100k+")).toBe(true);
  });

  test("testing for potential employee-size entry", () => {
    expect(isEmployeeSize("100-100k")).toBe(false);
  });
});