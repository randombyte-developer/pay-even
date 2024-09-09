import type { Person } from "$lib/server/database";
import { fork, isEmpty, last, sort, sum } from "radash";

export type Transaction = {
	from: string;
	to: string;
	amount: number;
};

export function calculate(persons: Person[]): Transaction[] {
	const expenses = persons.map((person) => ({
		id: person.id,
		amount: sum(person.expenses, (e) => e.amountCents)
	}));
	const expensesSum = sum(expenses, (e) => e.amount);
	const avgExpensePerPerson = expensesSum / persons.length;
	const diffs = expenses.map((e) => {
		const diff = e.amount - avgExpensePerPerson;
		return {
			id: e.id,
			diff: Math.abs(diff),
			isDebitor: diff < 0
		};
	});
	const sortedDiffs = sort(diffs, (diff) => diff.diff);
	const [debitors, creditors] = fork(sortedDiffs, (diff) => diff.isDebitor);

	const transactions: Array<Transaction> = [];
	while (!isEmpty(debitors) && !isEmpty(creditors)) {
		const largestDebitor = last(debitors)!;
		const largestCreditor = last(creditors)!;

		const amount = Math.min(largestDebitor.diff, largestCreditor.diff);
		transactions.push({
			from: largestDebitor.id,
			to: largestCreditor.id,
			amount: amount
		});

		largestDebitor.diff -= amount;
		largestCreditor.diff -= amount;
		console.log(`Remaining diff deb: ${largestDebitor.diff}`);
		console.log(`Remaining diff cred: ${largestCreditor.diff}`);
		if (largestDebitor.diff == 0) debitors.pop();
		if (largestCreditor.diff == 0) creditors.pop();
	}

	return transactions;
}
