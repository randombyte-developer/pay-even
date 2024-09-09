import { error } from "@sveltejs/kit";
import { max } from "radash";

export type User = {
	id: string;
	persons: Person[];
};

export type Person = {
	id: string;
	order: number;
	name: string;
	expenses: Expense[];
};

export type Expense = {
	id: string;
	amountCents: number;
	name?: string;
};

const db = new Array<User>();

function getOrCreateUser(userId: string): User {
	let user = db.find((user) => user.id === userId);
	if (!user) {
		user = {
			id: userId,
			persons: []
		};
		db.push(user);
	}
	return user;
}

export function createPerson(userId: string, name: string) {
	const user = getOrCreateUser(userId);
	const maxPersonOrder = max(user.persons, (person) => person.order)?.order ?? 0;
	const person: Person = {
		id: crypto.randomUUID(),
		order: maxPersonOrder + 1,
		name: name,
		expenses: []
	};
	user.persons.push(person);
}

export function getPersons(userId: string): Person[] {
	return getOrCreateUser(userId).persons;
}

function getPerson(userId: string, personId: string): Person {
	const persons = getPersons(userId);
	const person = persons.find((person) => person.id === personId);
	if (person == null) {
		throw error(404, "Person not found!");
	}

	return person;
}

export function deletePerson(userId: string, personId: string) {
	const user = getOrCreateUser(userId);
	user.persons = user.persons.filter((person) => person.id !== personId);
}

export function createExpense(
	userId: string,
	personId: string,
	amountCents: number,
	name?: string
) {
	const person = getPerson(userId, personId);
	person.expenses.push({
		id: crypto.randomUUID(),
		amountCents: amountCents,
		name: name
	});
}

export function deleteExpense(userId: string, personId: string, expenseId: string) {
	const person = getPerson(userId, personId);
	person.expenses = person.expenses.filter((expense) => expense.id !== expenseId);
}
