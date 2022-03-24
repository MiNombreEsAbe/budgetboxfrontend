import API from '../../API';
import { fetchTransactionsAction, addTransactionAction, updateTransactionAction,
    deleteTransactionAction, errorTransactionAction, resetErrorTransactionAction,
    fetchReportTransactionsAction, fetchExpenseReportAction,
    fetchLast4MonthsReportAction } from './actions';

const api = new API();

export const fetchTransactions = query => {
  return async dispatch => {
    return api.getTransactions(query).then(transactions => {
      dispatch(fetchTransactionsAction(transactions));
    });
  };
};

export const addTransaction = addTransactionBody => {
  return dispatch => {
    return api
      .addTransactions(addTransactionBody)
      .then(transactions => {
        dispatch(addTransactionAction(transactions));
      })
      .catch(errs => {
        dispatch(errorTransactionAction(errs));
      });
  };
};

export const updateTransaction = (updateTransactionBody, id) => {
  return dispatch => {
    return api
      .updateTransactions(updateTransactionBody, id)
      .then(transactions => {
        dispatch(updateTransactionAction(transactions));
      })
      .catch(errs => {
        dispatch(errorTransactionAction(errs));
      });
  };
};

export const deleteTransaction = id => {
  return dispatch => {
    return api
      .deleteTransactions(id)
      .then(transactions => {
        dispatch(deleteTransactionAction(transactions));
      })
      .catch(errs => {
        dispatch(errorTransactionAction(errs));
      });
  };
};

export const fetchReportTransactions = (params = {}) => {
  return async dispatch => {
    return api
      .getReportTransactions(params)
      .then(report => dispatch(fetchReportTransactionsAction(report)));
  };
};

export const fetchExpenseReport = (params = {}) => {
  return async dispatch => {
    return api
      .getExpenseReport(params)
      .then(report => dispatch(fetchExpenseReportAction(report)));
  };
};

export const fetchLast4MonthsReport = (params = {}) => {
  return async dispatch => {
    return api
      .getLast4MonthsReport(params)
      .then(report => dispatch(fetchLast4MonthsReportAction(report)));
  };
};
