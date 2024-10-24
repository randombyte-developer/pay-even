import * as constants from "$lib/constants";
import * as calculator from "$lib/server/calculator";
import * as db from "$lib/server/database";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

const userIdCookie = "userId";

export function load({ cookies }) {
	let userId = cookies.get(userIdCookie);
	if (!userId) {
		userId = crypto.randomUUID();
		cookies.set(userIdCookie, userId, { path: "/" });
	}

	return {
		persons: db.getPersons(userId)
	};
}

export const actions = {
	clear: async ({ cookies }) => {
		const userId = cookies.get(userIdCookie)!;
		const persons = db.getPersons(userId);
		for (const person of persons) {
			db.deletePerson(userId, person.id);
		}
	},
	createPerson: async ({ cookies, request }) => {
		const data = await request.formData();
		const userId = cookies.get(userIdCookie)!;
		const personName = data.get(constants.FORM_PERSON_NAME) as string;
		db.createPerson(userId, personName);
	},
	deletePerson: async ({ cookies, request }) => {
		const data = await request.formData();
		const userId = cookies.get(userIdCookie)!;
		const personId = data.get(constants.FORM_PERSON_ID) as string;
		db.deletePerson(userId, personId);
	},
	upsertExpense: async ({ cookies, request }) => {
		const data = await request.formData();
		const userId = cookies.get(userIdCookie)!;
		const personId = data.get(constants.FORM_PERSON_ID) as string;
		const expenseAmount = parseInt(data.get(constants.FORM_EXPENSE_AMOUNT) as string);
		const expenseName = data.get(constants.FORM_EXPENSE_NAME) as string | undefined;
		const expenseId = data.get(constants.FORM_EXPENSE_ID) as string | undefined;

		if (isNaN(expenseAmount) || expenseAmount <= 0) {
			return fail(422, { error: "Invalid number!", personId: personId });
		}

		if (expenseId) {
			db.updateExpense(userId, personId, expenseId, expenseAmount, expenseName);
		} else {
			db.createExpense(userId, personId, expenseAmount, expenseName);
		}
	},
	deleteExpense: async ({ cookies, request }) => {
		const data = await request.formData();
		const userId = cookies.get(userIdCookie)!;
		const personId = data.get(constants.FORM_PERSON_ID) as string;
		const expenseId = data.get(constants.FORM_EXPENSE_ID) as string;
		db.deleteExpense(userId, personId, expenseId);
	},
	calculate: async ({ cookies }) => {
		const userId = cookies.get(userIdCookie)!;
		const persons = db.getPersons(userId);
		const transactions = calculator.calculate(persons);
		return {
			transactions: transactions
		};
	}
} satisfies Actions;
