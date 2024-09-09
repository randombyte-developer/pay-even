import type { Person } from "$lib/server/database"
import { sum, keys } from "radash"

export type Transaction = {
    from: string,
    to: string,
    amount: number
};

export function calculate(persons: Person[]): Transaction[] {
    const expensePerPerson = Object.fromEntries(persons.map(p => [p.id, sum(p.expenses, e => e.amountCents)]));
    const expenseSum = sum(Object.values(expensePerPerson));
    const avgExpensePerPerson = expenseSum / persons.length;
    const transactionSum = 0.5 * sum(Object.values(expensePerPerson).map(e => Math.abs(e - avgExpensePerPerson)))

    if (transactionSum === 0) return [];

    const result = keys(expensePerPerson).flatMap(i =>
        keys(expensePerPerson)
            .map(j => ({
                from: i,
                to: j,
                amount: -(expensePerPerson[j] - avgExpensePerPerson) * (expensePerPerson[i] - avgExpensePerPerson) / transactionSum
            }))
    );
    return result;
}