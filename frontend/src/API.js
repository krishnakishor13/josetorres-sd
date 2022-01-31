import axios from "axios";

export const LOGIN_USER_KEY = "BUDGET_NOTEBOOK_LOGIN_USER_KEY";

var baseURL;
// if (
//   process.env.REACT_APP_ENVIRONMENT &&
//   process.env.REACT_APP_ENVIRONMENT === "PRODUCTION"
// ) {
//   baseURL = process.env.REACT_APP_API_BASE_URL;
// } else {
  baseURL = "https://backend-budgetbox.herokuapp.com/";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (config.requireToken) {
      const user = localStorage.getItem(LOGIN_USER_KEY)
        ? JSON.parse(localStorage.getItem(LOGIN_USER_KEY))
        : null;
      config.headers.common["Authorization"] = user.token;
    }

    return config;
  },
  (err) => console.error(err)
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem(LOGIN_USER_KEY);
    }

    return Promise.reject(error);
  }
);

export default class API {
  signUp = async (signUpBody) => {
    const formData = new FormData();

    for (const key in signUpBody) {
      formData.append(key, signUpBody[key]);
    }

    return api.post("/users/signup/", formData);
  };

  signIn = async (signInBody) => {
    const formData = new FormData();
    for (const key in signInBody) {
      formData.append(key, signInBody[key]);
    }
    return api.post("/users/signin/", formData);
  };

  updateProfile = async (updateProfileBody, id) => {
    const formData = new FormData();
    for (const key in updateProfileBody) {
      formData.append(key, updateProfileBody[key]);
    }
    return api.put(`/users/update/${id}/`, formData, { requireToken: true });
  };

  updateBudget = async (updateBudgetBody, id) => {
    const formData = new FormData();
    formData.append("budget", updateBudgetBody);
    return api.put(`/users/update/${id}/budget/`, formData, {
      requireToken: true,
    });
  };

  // Transactions
  getTransactions = (query) => {
    const { page } = query;
    return api.get("/transactions/", {
      params: { page },
      requireToken: true,
    });
  };

  addTransactions = (addTransactionBody) => {
    const formData = new FormData();

    for (const key in addTransactionBody) {
      formData.append(key, addTransactionBody[key]);
    }

    return api.post("/transactions/add/", formData, { requireToken: true });
  };

  updateTransactions = (updateTransactionBody, id) => {
    const formData = new FormData();

    for (const key in updateTransactionBody) {
      formData.append(key, updateTransactionBody[key]);
    }

    return api.put(`/transactions/update/${id}/`, formData, {
      requireToken: true,
    });
  };

  deleteTransactions = (id) => {
    return api.delete(`/transactions/delete/${id}/`, { requireToken: true });
  };

  getReportTransactions = async (params = {}) => {
    return api.get("/transactions/reports/", {
      params,
      requireToken: true,
    });
  };

  // Categories
  getCategories = () => {
    return api.get("/category/", {
      requireToken: true,
    });
  };

  getExpenseReport = () => {
    return api.get("/transactions/expense-reports/", {
      requireToken: true,
    });
  };

  getLast4MonthsReport = () => {
    return api.get("/transactions/reports/", {
      requireToken: true,
    });
  };
}
