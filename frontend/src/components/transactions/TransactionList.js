const TransactionList = (props) => {
	const { date, name, amount, type, category } = props.data.transaction;

	const getDate = (date) => {
		return new Date(date).toLocaleDateString("en-CA", {
			day: "numeric",
			year: "numeric",
			month: "short",
		});
	};

	if (type === "income") {
		return (
			<tr onClick={props.data.onClick}>
				<td>{getDate(date)}</td>
				<td>{category.name}</td>
				<td>{name}</td>
				<td className="income-amount">
					<span> + </span> ${amount}
				</td>
			</tr>
		);
	} else {
		return (
			<tr onClick={props.data.onClick}>
				<td>{getDate(date)}</td>
				<td>{category.name}</td>
				<td>{name}</td>
				<td className="expense-amount">
					<span> - </span> ${amount}
				</td>
			</tr>
		);
	}
};
export default TransactionList;
