import { describe, expect, test } from "vitest";
import { calculate, type Transaction } from "./calculator";
import type { Person } from "./database";

function genPerson(id: string, expenses: number[]): Person {
    return {
        id: id,
        name: id,
        expenses: expenses.map((expense) => ({
            id: crypto.randomUUID(),
            amountCents: expense
        }))
    };
}

describe("calculator", () => {
    test.each(
        // prettier-ignore
        [
            {
                persons: [],
                expected: []
            },
            {
                persons: [
                    genPerson("a", []),
                    genPerson("b", [])
                ],
                expected: []
            },
            {
                persons: [
                    genPerson("a", [10]),
                    genPerson("b", [10])
                ],
                expected: []
            },
            {
                persons: [
                    genPerson("a", [10]),
                    genPerson("b", [20])
                ],
                expected: [
                    { from: "a", to: "b", amount: 5 }
                ]
            },
            {
                persons: [
                    genPerson("a", [10]),
                    genPerson("b", [20]),
                    genPerson("c", [30])
                ],
                expected: [
                    { from: "a", to: "c", amount: 10 }
                ]
            },
            {
                persons: [
                    genPerson("a", [10]),
                    genPerson("b", [10]),
                    genPerson("c", [40])
                ],
                expected: [
                    { from: "a", to: "c", amount: 10 },
                    { from: "b", to: "c", amount: 10 },
                ]
            },
            {
                persons: [
                    genPerson("a", [10]),
                    genPerson("b", [10]),
                    genPerson("c", [40]),
                    genPerson("d", [20])
                ],
                expected: [
                    { from: "a", to: "c", amount: 10 },
                    { from: "b", to: "c", amount: 10 },
                ]
            },
            {
                persons: [
                    genPerson("a", [10]),
                    genPerson("b", [15]),
                    genPerson("c", [40]),
                    genPerson("d", [15])
                ],
                expected: [
                    { from: "a", to: "c", amount: 10 },
                    { from: "b", to: "c", amount: 5 },
                    { from: "d", to: "c", amount: 5 },
                ]
            },
            {
                persons: [
                    genPerson("a", [5, 5]),
                    genPerson("b", [15]),
                    genPerson("c", [10, 10, 20]),
                    genPerson("d", [15])
                ],
                expected: [
                    { from: "a", to: "c", amount: 10 },
                    { from: "b", to: "c", amount: 5 },
                    { from: "d", to: "c", amount: 5 },
                ]
            }
        ]
    )("transaction are calculated as expected", ({ persons, expected }) => {
        // sort transactions because order should not matter
        function sortTransactions(transactions: Transaction[]) {
            transactions.sort((a, b) => a.from.localeCompare(b.from) || a.to.localeCompare(b.to) || a.amount - b.amount);
        }

        const actual = calculate(persons);
        sortTransactions(actual);
        sortTransactions(expected);

        expect(actual).toEqual(expected);
    });
});
