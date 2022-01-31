import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchTransactions } from '../../reducks/transactions/operations';


const Pagination = (props) => {
	const { totalPages, previous, next, current } = props.metadata;
	const elements = [];
	const dispatch = useDispatch();


	const pageHandler = (i) => {
		dispatch(fetchTransactions({ page: i }));
	};

	const getPage = (data) => {
		const { key, label, page } = data;
		return (
			<Link key={key} onClick={() => pageHandler(page)} to={`?page=${page}`}>
				{label}
			</Link>
		);
	};
	for (let i = 1; i <= totalPages; i++) {
		// eslint-disable-next-line no-lone-blocks
		{
			const pages = (
				<Link key={i} onClick={() => pageHandler(i)} to={`?page=${i}`}>
					<p className={current === i ? "active" : ''}>{i}</p>
				</Link>
			);
			elements.push(pages);
		}
	}
	const prevPage = current - 1;
	const nextPage = current + 1;

	elements.unshift(previous ? getPage({ key: "prev", page: prevPage, label: "Previous" }) : "");
	elements.push(next ? getPage({ key: "next", page: nextPage, label: "Next" }) : "");
	return elements;
};

export default Pagination;
