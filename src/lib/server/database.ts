import { error } from "@sveltejs/kit";

export type User = {
	id: string;
	persons: Person[];
};

export type Person = {
	id: string;
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
	const person: Person = {
		id: crypto.randomUUID(),
		name: name,
		expenses: []
	};
	user.persons.unshift(person);
}

export function updatePerson(userId: string, personId: string, name: string) {
	const person = getPerson(userId, personId);
	person.name = name;
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

export function updateExpense(
	userId: string,
	personId: string,
	expenseId: string,
	amountCents: number,
	name?: string
) {
	const person = getPerson(userId, personId);
	const expense = person.expenses.find((expense) => expense.id === expenseId);
	if (expense == null) {
		throw error(404, "Expense not found!");
	}
	expense.amountCents = amountCents;
	expense.name = name;
}

export function deleteExpense(userId: string, personId: string, expenseId: string) {
	const person = getPerson(userId, personId);
	person.expenses = person.expenses.filter((expense) => expense.id !== expenseId);
}
