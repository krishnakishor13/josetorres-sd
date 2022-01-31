import React, { useEffect, useState } from 'react';
import { Page, Section } from 'react-page-layout';
import { useDispatch, useSelector } from 'react-redux';

import TransactionIcon from '../assets/images/transaction.svg';
import AddTransactionBtn from '../components/default/AddTransactionBtn';
import Empty from '../components/default/Empty';
import Pagination from '../components/default/Pagination';
import SecondNavBar from '../components/default/SecondNavBar';
import ManageTransactionModal from '../components/transactions/ManageTransactionModal';
import TransactionList from '../components/transactions/TransactionList';
import { fetchCategories } from '../reducks/category/operations';
import { getCategories } from '../reducks/category/selectors';
import { resetErrorTransactionAction } from '../reducks/transactions/actions';
import {
    addTransaction,
    deleteTransaction,
    fetchReportTransactions,
    fetchTransactions,
    updateTransaction,
} from '../reducks/transactions/operations';
import { getTransactions } from '../reducks/transactions/selectors';

export default function Transaction() {
	const dispatch = useDispatch();
	const selector = useSelector((state) => state);
	const transactions = getTransactions(selector);
	const categories = getCategories(selector);
	const page = 1;

	const [openModal, setOpenModal] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const [openModalConfirmation, setOpenModalConfirmation] = useState(false);

	const initialValues = { id: null, type: "", date: new Date().toLocaleDateString("en-CA"), name: "", category: "", amount: 0 };
	const [values, setValues] = useState(initialValues);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setValues({
			...values,
			[name]: value,
		});
	};

	useEffect(() => {
		dispatch(fetchTransactions({ page }));
		dispatch(fetchCategories());
		// eslint-disable-next-line
	}, []);

	const addReportHandler = async () => {
		await dispatch(addTransaction(values));
		await dispatch(fetchTransactions({ page }));
		setValues({ type: "", name: "", category: "", date: new Date().toLocaleDateString("en-CA"), amount: 0 });
		setOpenModal(true);
	};

	const openAddReportModalHandler = () => {
		setValues({ type: "", name: "", category: "", date: new Date().toLocaleDateString("en-CA"), amount: 0 });
		dispatch(resetErrorTransactionAction());
		setOpenModal(true);
		setIsUpdate(false);
	};

	const closeAddReportModalHandler = () => {
		dispatch(resetErrorTransactionAction());
		setOpenModal(false);
	};

	const detailReportHandle = (data) => {
		setIsUpdate(true);
		setOpenModal(true);
		setValues({ ...data, category: data.category.id });
	};

	const deleteReportHandler = async () => {
		await dispatch(deleteTransaction(values.id));
		await dispatch(fetchTransactions({ page }));
		await dispatch(fetchReportTransactions());
		setIsUpdate(false);
		setOpenModal(false);
		setOpenModalConfirmation(false);
	};

	const updateReportHandler = async () => {
		await dispatch(updateTransaction(values, values.id));
		await dispatch(fetchTransactions({ page }));
		setIsUpdate(false);
		setOpenModal(false);
	};

	return (
		<Page layout="default">
			<Section slot="breadcrumbs">
				<SecondNavBar
					title="Transaction"
					right={<AddTransactionBtn openAddReportModalHandler={openAddReportModalHandler} />}
				/>
			</Section>
			<Section slot="main">
				<ManageTransactionModal
					actions={{
						addReportHandler,
						closeAddReportModalHandler,
						deleteReportHandler,
						handleInputChange,
						setOpenModalConfirmation,
						updateReportHandler,
					}}
					metadata={{
						categories,
						errors: transactions.errors,
						openModal,
						openModalConfirmation,
						isUpdate,
						values,
					}}
				/>
				<div className="transaction">
					<div className="table-container">
						{transactions.results && transactions.results.length > 0 ? (
							<table>
								<thead>
									<tr>
										<th>Date</th>
										<th>Category</th>
										<th>Name</th>
										<th>Cost</th>
									</tr>
								</thead>
								<tbody>
									{transactions.results.map((t) => (
										<TransactionList
											key={t.id}
											data={{ transaction: t, onClick: () => detailReportHandle(t) }}
										/>
									))}
								</tbody>
							</table>
						) : (
							<Empty
								className={"no-transaction-container"}
								icon={TransactionIcon}
								message="No transactions here yet..."
							/>
						)}
					</div>
					{transactions.results && transactions.results.length > 0 ? (
						<div className="pagination">
							<Pagination
								metadata={{
									links: transactions.links,
									totalPages: transactions.total_pages,
									count: transactions.count,
									next: transactions.next,
									previous: transactions.previous,
									current: transactions.current,
								}}
							/>
						</div>
					) : (
						""
					)}
				</div>
			</Section>
		</Page>
	);
}
