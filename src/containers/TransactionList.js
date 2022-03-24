import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import Navigation from "../components/default/Navigation";
import Header from "../components/default/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import {
    addTransaction,
    deleteTransaction,
    fetchReportTransactions,
    fetchTransactions,
    updateTransaction,
} from '../redux/transactions/operations';
import { fetchCategories } from '../redux/category/operations';

export default function TransactionList() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const transactions = selector['transaction']['results'];
	const categories = selector['category']['results'];
    const initialValues = { 
        entryType: null, 
        date: new Date().toLocaleDateString("en-CA"), 
        name: "", 
        category: "", 
        amount: 0 
    };
	const [values, setValues] = useState(initialValues);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const handleChange = e => {
        const { name, value } = e.target;
        
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSumit = async () => {
        dispatch(addTransaction(values));
		dispatch(fetchTransactions(1));
		setValues({ name: "", category: "", date: new Date().toLocaleDateString("en-CA"), amount: 0 });
		setShowModal(false);
    }

    useEffect(() => {
		dispatch(fetchTransactions(1));
		dispatch(fetchCategories());
	}, []);

    return (
        <div className="transactionListHolder">
            <Navigation active="transaction" />
            <div className="transactionList">
                <Header />
                <div className="transactionContent">
                    <div className="header">
                        <p>Transaction List</p>
                        <button onClick={openModal}>Add <FontAwesomeIcon icon={faCirclePlus} /></button>
                    </div>    
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Name</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            transactions.map((t, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{t.date}</td>
                                        <td>{t.category.name}</td>
                                        <td>{t.name}</td>
                                        <td className={t.entryType ? "red" : "green"}>
                                            {t.entryType ? "-" : "+"}{t.amount}
                                        </td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                </div>
                {showModal ? (
                    <div className="modal">
                        <div className="modalContent">
                            <FontAwesomeIcon icon={faCircleXmark} onClick={closeModal} />
                            <select onChange={handleChange} name="entryType" required>
                                <option selected disabled>Income or Expense</option>
                                <option value="0">Income</option>
                                <option value="1">Expense</option>
                            </select>
                            <select onChange={handleChange} name="category" required>
                                <option selected disabled>Category Type</option>
                                {
                                    categories.map(cat => {
                                        return <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    })
                                }
                            </select>
                            <div className="nameInputHolder">
                                <label htmlFor="nameInput">Name</label>
                                <input 
                                    id="nameInput" 
                                    type="text" 
                                    name="name" 
                                    value={values.name} 
                                    onChange={handleChange}
                                    placeholder="Milk"
                                    required
                                />
                            </div>
                            <div className="costInputHolder">
                                <label htmlFor="costInput">Amount</label>
                                <input 
                                    id="costInput" 
                                    type="number" 
                                    name="amount" 
                                    value={values.amount} 
                                    onChange={handleChange}
                                    placeholder="1.00"
                                    min="0.01" step="0.01"
                                    required
                                />
                            </div>
                            <div className="dateInputHolder">
                                <label htmlFor="dateInput">Date</label>
                                <input 
                                    id="dateInput" 
                                    type="date" 
                                    name="date" 
                                    value={values.date} 
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button onClick={handleSumit}>Create</button>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}