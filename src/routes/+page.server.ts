import type { Actions } from "./$types";
import * as constants from "$lib/constants";
import * as db from "$lib/server/database";

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
    createExpense: async ({ cookies, request }) => {
        const data = await request.formData();
        const userId = cookies.get(userIdCookie)!;
        const personId = data.get(constants.FORM_PERSON_ID) as string;
        const expenseAmount = parseInt(data.get(constants.FORM_EXPENSE_AMOUNT) as string);
        const expenseName = data.get(constants.FORM_EXPENSE_NAME) as string | undefined;
        db.createExpense(userId, personId, expenseAmount, expenseName);
    },
    deleteExpense: async ({ cookies, request }) => {
        const data = await request.formData();
        const userId = cookies.get(userIdCookie)!;
        const personId = data.get(constants.FORM_PERSON_ID) as string;
        const expenseId = data.get(constants.FORM_EXPENSE_ID) as string;
        db.deleteExpense(userId, personId, expenseId);
    },
} satisfies Actions;
