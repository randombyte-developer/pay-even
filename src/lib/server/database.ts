import { max } from "radash";

type User = {
	persons: Map<string, Person>;
};

type Person = {
	id: string;
	order: number;
	name: string;
	expenses: Map<string, Expense>;
};

type Expense = {
	id: string;
	amountCents: number;
	name?: string;
};

const db = new Map<string, User>();

function getOrCreateUser(userId: string): User {
	if (!db.get(userId)) {
		db.set(userId, {
			persons: new Map()
		});
	}

	return db.get(userId)!;
}

export function createPerson(userId: string, name: string) {
	const user = getOrCreateUser(userId);
	const maxPersonOrder = max([...user.persons.values()], (p) => p.order)?.order ?? 0;
	const person: Person = {
		id: crypto.randomUUID(),
		order: maxPersonOrder + 1,
		name: name,
		expenses: new Map()
	};
	user.persons.set(person.id, person);
}

export function getPersons(userId: string): Person[] {
	const user = getOrCreateUser(userId);
	return [...user.persons.values()];
}

export function deletePerson(userId: string, personId: string) {
	const user = getOrCreateUser(userId);
	user.persons.delete(personId);
}
