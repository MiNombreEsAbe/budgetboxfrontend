import axios from 'axios';

export const LOGIN_USER = 'BUDGET_NOTEBOOK_LOGIN_USER';

let baseURL = "https://budgetboxbackend.herokuapp.com/api";

// if (process.env.REACT_APP_ENVIRONMENT && process.env.REACT_APP_ENVIRONMENT === 'PRODUCTION') {
//     baseURL = process.env.REACT_APP_API_BASE_URL;
// } else {
//     baseURL = "http://127.0.0.1:8000/api";
// }

const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
	config => {
		if (config.requireToken) {
            const user = localStorage.getItem(LOGIN_USER) ? JSON.parse(localStorage.getItem(LOGIN_USER)) : null;

			config.headers.common["Authorization"] = JSON.stringify(user);
		}

		return config;
	},
	err => console.error(err)
);

api.interceptors.response.use(
    res => {
        return res.data;
    },
    err => {
        if (err.response.status === 401) localStorage.removeItem(LOGIN_USER);

        return Promise.reject(err);
    }
)

export default class API {
	signUp = async body => {
		const formData = new FormData();

		for (const key in body) {
			formData.append(key, body[key]);
		}

		return api.post("/users/create", formData);
	};

	signIn = async body => {
		const formData = new FormData();
		for (const key in body) {
			formData.append(key, body[key]);
		}

		return api.post("/users/auth", formData);
	};

	updateProfile = async (body, id) => {
		const formData = new FormData();
		for (const key in body) {
			formData.append(key, body[key]);
		}
		return api.put(`/users/update/${id}`, formData, { requireToken: true });
	};

	updateBudget = async (body, id) => {
		const formData = new FormData();
		formData.append('budget', body);
		return api.put(`/users/updateBudget/${id}`, formData, { requireToken: true });
	};

	// Transactions
	getTransactions = (query) => {
		const { page } = query;
		return api
			.get("/moneyEntry/list", {
				requireToken: true
			})
	};

	addTransactions = body => {
		const formData = new FormData();

		for (const key in body) {
			formData.append(key, body[key]);
		}

		return api.post("/moneyEntry/create", formData, {requireToken: true})
	};

    updateTransactions = (body, id) => {
		const formData = new FormData();

		for (const key in body) {
			formData.append(key, body[key]);
		}

		return api.put(`/moneyEntry/update/${id}`, formData, {requireToken: true})
	};

    deleteTransactions = (id) => {
		return api.delete(`/moneyEntry/delete/${id}`, {requireToken: true})
	};

    getReportTransactions = async (params = {}) => {
        return api.get("/moneyEntry/reports", {
            params,
            requireToken: true
        });
    }

	// Categories
	getCategories = () => {
		return api
			.get("/categories/list", {
				requireToken: true
			})
	};

	getExpenseReport = () => {
		return api.get('/moneyEntry/expenseReport', {
			requireToken: true
		});
	}

	getLast4MonthsReport = () => {
		return api.get('/moneyEntry/reports', {
			requireToken: true
		});
	}
}