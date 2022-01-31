import AddIcon from "../../assets/images/add-icon.png";
const AddTransactionBtn = (props) => {
	const { openAddReportModalHandler } = props;
	return (
		<div onClick={openAddReportModalHandler} className="add-budget">
			<p>Add</p>
			<img src={AddIcon} alt="" />
		</div>
	);
};

export default AddTransactionBtn;
