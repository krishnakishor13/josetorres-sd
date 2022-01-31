import CancelModal from "../../assets/images/cancel.png";
import ErrorInput from "../default/ErrorInput";

const ManageTransactionModal = (props) => {
	const {
		addReportHandler,
		closeAddReportModalHandler,
		deleteReportHandler,
		handleInputChange,
		setOpenModalConfirmation,
		updateReportHandler,
	} = props.actions;
	const { openModal, values, categories, errors, isUpdate, openModalConfirmation } = props.metadata;
	values.date = values.date ? values.date : new Date().toLocaleDateString("en-CA");
	return (
		<>
			<div id="custom-modal" className={`custom-modal ${openModal ? "" : "modal-hide"}`}>
				<div id="custom-modal-close" onClick={closeAddReportModalHandler} className="custom-modal--bg"></div>
				<div className="custom-modal--container">
					<div className="custom-modal--content">
						<div onClick={closeAddReportModalHandler} className="custom-modal--cancel">
							<img src={CancelModal} alt="cancel" />
						</div>
						<div className="modal-content">
							<form className="popup-form-container">
								<select
									value={values.type}
									onChange={handleInputChange}
									name="type"
									className="budget-dropdown mt-2"
								>
									<option value="">Income or Expense</option>
									<option value="income">Income</option>
									<option value="expense">Expense</option>
								</select>
								<ErrorInput error={errors.type} />
								<select
									value={values.category}
									onChange={handleInputChange}
									name="category"
									className="budget-dropdown mt-2"
								>
									<option value="">Budget Category</option>
									{categories.results && categories.results.length > 0
										? categories.results.map((c) => {
												return (
													<option key={c.id} value={c.id}>
														{c.name}
													</option>
												);
										  })
										: ""}
								</select>
								<ErrorInput error={errors.category} />
								<div className="budget-form">
									<div className="budget-input">
										<div className="mb-2">
											<label htmlFor="name">Name</label>
											<input
												onChange={handleInputChange}
												value={values.name}
												name="name"
												className="custom-input-modal"
												type="text"
											/>
											<ErrorInput error={errors.name} />
										</div>
										<div className="mb-2">
											<label htmlFor="cost">Cost</label>
											<input
												onChange={handleInputChange}
												value={values.amount}
												name="amount"
												className="custom-input-modal"
												type="number"
												min="1"
											/>
											<ErrorInput error={errors.amount} />
										</div>
										<div className="mb-2">
											<label htmlFor="date">Date</label>
											<input
												onChange={handleInputChange}
												value={values.date}
												name="date"
												className="custom-input-modal"
												type="date"
											/>
											<ErrorInput error={errors.date} />
										</div>
										{isUpdate ? (
											<div className="setting-button">
												<button
													onClick={updateReportHandler}
													type="button"
													className="custom-btn update"
												>
													Update
												</button>
												<button
													onClick={() => setOpenModalConfirmation(true)}
													type="button"
													className="custom-btn delete"
												>
													Delete
												</button>
											</div>
										) : (
											<button
												onClick={addReportHandler}
												type="button"
												className="custom-btn active"
											>
												Add
											</button>
										)}
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div id="custom-modal" className={`custom-modal ${openModalConfirmation ? "" : "modal-hide"}`}>
				<div
					id="custom-modal-close"
					onClick={() => setOpenModalConfirmation(false)}
					className="custom-modal--bg"
				></div>
				<div className="custom-modal-transaction--container">
					<div className="custom-modal-transaction--content">
						<div className="modal-transaction-content">
							<strong>Are you sure you want to delete this transaction?</strong>
							<div>
								<button className="custom-btn mr-1" onClick={deleteReportHandler}>
									Yes
								</button>
								<button className="custom-btn ml-1" onClick={() => setOpenModalConfirmation(false)}>
									No
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ManageTransactionModal;
