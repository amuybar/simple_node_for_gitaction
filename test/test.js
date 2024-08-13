const add = require("../index");
const { expect } = require("chai");

describe("Addition", () => {
  it("should return 5 when adding 2 and 3", () => {
    expect(add(2, 3)).to.equal(5);
  });

  it("should return 0 when adding 0 and 0", () => {
    expect(add(0, 0)).to.equal(0);
  });
});
