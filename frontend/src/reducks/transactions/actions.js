export const FETCH_TRANSACTIONS = "FETCH_TRANSACTIONS";
export const fetchTransactionsAction = (transactions) => {
    return {
        type: FETCH_TRANSACTIONS,
        payload: { transactions }
    }
}

export const ADD_TRANSACTION = "ADD_TRANSACTION";
export const addTransactionAction = () => {
    return {
        type: ADD_TRANSACTION,
    }
}

export const UPDATE_TRANSACTION = "UPDATE_TRANSACTION";
export const updateTransactionAction = () => {
    return {
        type: UPDATE_TRANSACTION,
    }
}

export const DELETE_TRANSACTION = "DELETE_TRANSACTION";
export const deleteTransactionAction = () => {
    return {
        type: DELETE_TRANSACTION,
    }
}

export const ERRORS_TRANSACTION = "ERRORS_TRANSACTION";
export const errorTransactionAction = (errors) => {
    return {
        type: ERRORS_TRANSACTION,
        payload: { errors }
    }
}

export const RESET_ERRORS_TRANSACTION = "RESET_ERRORS_TRANSACTION";
export const resetErrorTransactionAction = () => {
    return {
        type: RESET_ERRORS_TRANSACTION,
    }
}

export const FETCH_REPORT_TRANSACTIONS = "FETCH_REPORT_TRANSACTIONS";
export const fetchReportTransactionsAction = (reports) => {
    return {
        type: FETCH_REPORT_TRANSACTIONS,
        payload: { reports }
    }
}

export const FETCH_EXPENSE_REPORT = "FETCH_EXPENSE_REPORT";
export const fetchExpenseReportAction = (reports) => {
    return {
        type: FETCH_EXPENSE_REPORT,
        payload: { reports }
    }
}

export const FETCH_LAST_4_MONTHS_REPORT = "FETCH_LAST_4_MONTHS_REPORT";
export const fetchLast4MonthsReportAction = (reports) => {
    return {
        type: FETCH_LAST_4_MONTHS_REPORT,
        payload: { reports }
    }
}