import React, { createRef, useEffect, useRef, useState } from 'react';
import { Page, Section } from 'react-page-layout';
import { useDispatch, useSelector } from 'react-redux';

import CancelModal from './../assets/images/cancel.png';
import PieChart from '../components/dashboard/PieChart';
import Breadcrumbs from '../components/default/SecondNavBar';
import { fetchExpenseReport, fetchLast4MonthsReport } from '../reducks/transactions/operations';
import { getExpenseReport, getLast4MonthsReport } from '../reducks/transactions/selectors';
import { updateBudget } from '../reducks/users/operations';
import { getUser } from '../reducks/users/selectors';

export default function Report() {
	const dispatch = useDispatch();
	const selector = useSelector((state) => state);
	const expenseReports = getExpenseReport(selector);
	const last4MonthsReport = getLast4MonthsReport(selector);
	const user = getUser(selector);

	const defaultGap = 1000;
	const nextBtnRef = useRef();
	const prevBtnRef = useRef();

	let [currentIndex, setCurrentIndex] = useState(3);
	let [previousIndex, setPreviousIndex] = useState(4);
	let [currentGap, setCurrentGap] = useState(1000);
	let [isWeb, setIsWeb] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [amount, setAmount] = useState(0);

	const handleResize = () => {
		if (window.matchMedia("(max-width: 520px)").matches) {
			setIsWeb(false);

			// Reset Index and Gap
			setCurrentIndex(3)
			setPreviousIndex(4)
			setCurrentGap(1000)
		} else {
			setIsWeb(true);
		}
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		dispatch(fetchExpenseReport());
		dispatch(fetchLast4MonthsReport());
		// eslint-disable-next-line
	}, []);

	const largestReportAmount = Math.max.apply(
		Math,
		[{ total_amount: 0 }].concat(...last4MonthsReport).map((obj) => {
			return obj.total_amount;
		})
	);

	const chartGapAmount = Math.ceil((largestReportAmount * 1.3) / 7 / 100) * 100;
	const highestGraphAmount = chartGapAmount * 7;
	const chartHeight = 600;

	const formatTotalAmount = (amount) => {
		if (amount >= 1000000) {
			return (amount / 1000000).toFixed(1) + "M";
		}
		if (amount >= 1000) {
			return (amount / 1000).toFixed(1) + "K";
		}
		return amount;
	};

	const chartRefs = React.useRef([]);

	chartRefs.current = last4MonthsReport.map((_, i) => chartRefs.current[i] ?? createRef());

	if (isWeb) {
		// Clear style when web screen
		if (chartRefs.current.length > 0) {
			for (let i = 0; i < 4; i++) {
				if (chartRefs.current[i].current) {
					chartRefs.current[i].current.style.left = "";
				}
			}
		}
	}
	
	if(currentIndex === 3 && prevBtnRef.current) prevBtnRef.current.style.display = 'none'

	const nextChartHandler = () => {
		prevBtnRef.current.style.display = 'block'
		if(currentIndex === 1) nextBtnRef.current.style.display = 'none'
		if (currentIndex === 0) return;
		
		setPreviousIndex(--previousIndex);
		setCurrentIndex(--currentIndex);
		
		chartRefs.current[previousIndex].current.style.left = `calc(35% + ${currentGap}px)`;
		chartRefs.current[currentIndex].current.style.left = `35%`;
		setCurrentGap(currentGap + defaultGap);
	};

	const prevChartHandler = () => {
		nextBtnRef.current.style.display = 'block'
		if (currentIndex === 3) return;
		
		chartRefs.current[currentIndex].current.style.left = `calc(35% - ${currentGap}px)`;
		chartRefs.current[previousIndex].current.style.left = `35%`;

		setCurrentIndex(++currentIndex);
		setPreviousIndex(++previousIndex);
		setCurrentGap(currentGap - defaultGap);
	};

	const updateAmountHandler = async () => {
		await dispatch(updateBudget(amount, user.id))
		await dispatch(fetchExpenseReport());
		setOpenModal(false)
	}

	return (
		<Page layout="default">
			<Section slot="breadcrumbs">
				<Breadcrumbs title="Dashboard" />
			</Section>
			<Section slot="main">
				<div id="custom-modal" className={`custom-modal ${openModal ? "" : "modal-hide"}`}>
					<div id="custom-modal-close" onClick={()=> setOpenModal(false)} className="custom-modal--bg"></div>
					<div className="custom-modal--container">
						<div className="custom-modal--content">
							<div onClick={()=> setOpenModal(false)} className="custom-modal--cancel">
								<img src={CancelModal} alt="cancel" />
							</div>
							<div className="modal-content">
								<form className="popup-form-container">
									<div className="budget-form">
										<div className="budget-input">
											<div className="mb-2">
												<label htmlFor="cost">Budget</label>
												<input
													onChange={(e)=> setAmount(e.target.value)}
													value={amount ? amount : expenseReports.budget}
													name="amount"
													className="custom-input-modal"
													type="number"
													min="1"
												/>
											</div>
											<button
												onClick={updateAmountHandler}
												type="button"
												className="custom-btn update"
											>
												Edit
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div className="dashboard">
					<div className="dashboard-left">
						<div className="content container--chart">
							<div className="inner-container--chart">
								<div className="p-2">Income and Expenses</div>
								<div className="pl-2">Last 4 Months Reports</div>
								<div>
									<span className="label-bar expense-amount">Expenditure</span>
									<span className="label-bar income-amount">Income</span>
								</div>
								<div className="bottom-line"></div>
								<div ref={nextBtnRef} onClick={nextChartHandler} id="prev-btn"></div>
								<div ref={prevBtnRef} onClick={prevChartHandler} id="next-btn"></div>
								<table id="q-graph">
									<tbody>
										{last4MonthsReport.map((report, index) => {
											let income = report.find((i) => {
												return i.type === "income";
											});
											let expense = report.find((i) => {
												return i.type === "expense";
											});
											return (
												<tr
													ref={chartRefs.current[index]}
													className="qtr"
													id={`q${index + 1}`}
													key={`graph-${index}`}
												>
													<th scope="row">{report[0].date}</th>
													<td
														className="tooltip expense-bar bar"
														style={{
															height:
																((expense ? expense.total_amount : 0) * chartHeight) /
																highestGraphAmount,
														}}
													>
														<span className="tooltiptext">{`$${
															expense ? formatTotalAmount(expense.total_amount) : 0
														}`}</span>
													</td>
													<td
														className="tooltip income-bar bar"
														style={{
															height:
																((income ? income.total_amount : 0) * chartHeight) /
																highestGraphAmount,
														}}
													>
														<span className="tooltiptext">{`$${
															income ? formatTotalAmount(income.total_amount) : 0
														}`}</span>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div className="dashboard-right">
						<div className="dashboard-right-top">
							<div className="dashboard-right-top-container">
								<div className="dashboard-right-title">Monthly budget</div>
								<div>
									Calculation of last 4 months expense will be your Average budget.
								</div>
								<div>
									<span className="font-size-28 mt-2">Budget ${expenseReports.budget}</span>
									<span onClick={()=> setOpenModal(true)} className="ml-1 edit-budget">Edit</span>
								</div>
								<div className="font-size-28">Expense ${expenseReports.total_expense}</div>
								<div className="font-size-28">Remainder ${expenseReports.reminder}</div>
							</div>
						</div>
						<div className="dashboard-right-bottom">
							<div className="dashboard-right-bottom-container">
								<div className="dashboard-right-title">Expenses</div>
								<PieChart data={expenseReports} />
							</div>
						</div>
					</div>
				</div>
			</Section>
		</Page>
	);
}
