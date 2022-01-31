import { createSelector } from "reselect";

const transactionsSelector = (state) => state.transactions;
export const getTransactions = createSelector(
    [transactionsSelector],
    state => state
);

export const getExpenseReport = createSelector(
    [transactionsSelector],
    state => state.expenseReports
);

export const getLast4MonthsReport = createSelector(
    [transactionsSelector],
    state => state.last4MonthsReport
);