import { describe, expect, it } from "vitest";
import { changeQuantity, parseCart } from "../../src/lib/cart";
describe("cart", () => {
  it("recovers from corrupted and invalid stored data", () => {
    for (const value of [
      null,
      "bad",
      "{}",
      "null",
      '[{"id":1,"quantity":2},{"id":"a","quantity":-1}]',
    ])
      expect(parseCart(value)).toEqual([]);
    expect(
      parseCart(
        '[{"id":"a","quantity":200},{"id":"a","quantity":3},{"id":"b","quantity":500}]',
      ),
    ).toEqual([
      { id: "a", quantity: 3 },
      { id: "b", quantity: 99 },
    ]);
  });
  it("adds, changes and removes quantities without mutating", () => {
    const initial = [{ id: "a", quantity: 2 }];
    expect(changeQuantity(initial, "a", 3)).toEqual([{ id: "a", quantity: 3 }]);
    expect(changeQuantity(initial, "b", 2)).toEqual([
      ...initial,
      { id: "b", quantity: 2 },
    ]);
    expect(changeQuantity(initial, "a", 0)).toEqual([]);
    expect(initial[0].quantity).toBe(2);
  });
  it("bounds quantities and ignores non-finite values", () => {
    expect(changeQuantity([], "a", 500)).toEqual([{ id: "a", quantity: 99 }]);
    expect(changeQuantity([], "a", 1.8)).toEqual([{ id: "a", quantity: 1 }]);
    expect(changeQuantity([], "a", NaN)).toEqual([]);
  });
});
