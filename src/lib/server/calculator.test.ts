import { list } from "radash";
import { describe, expect, test } from "vitest";
import { calculate } from "./calculator";

describe("calculator", () => {
	test("no person returns no transaction", () => {
		expect(calculate([])).toHaveLength(0);
	});

	test("no expense returns no transaction", () => {
		expect(
			calculate(
				list(2).map((i) => ({
					id: crypto.randomUUID(),
					order: i,
					name: `Test ${i}`,
					expenses: []
				}))
			)
		).toHaveLength(0);
	});
});
