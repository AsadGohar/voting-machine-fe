import * as React from "react";
import * as VotingService from "../../services/VotingService";
import { AllResults } from "../../components/AllResults";
import Pagination from "../../components/Pagination";
import { PAGE_SIZE } from "../../utils/consts";

export const AdminResults = React.memo(() => {
	const [results, setResults] = React.useState([]);

	const [currentPage, setCurrentPage] = React.useState(1);

	const currentData = React.useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
		const lastPageIndex = firstPageIndex + PAGE_SIZE;
		return results.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, results]);

	React.useEffect(() => {
		fetchAllResults();
	}, []);

	const fetchAllResults = async () => {
		try {
			const res = await VotingService.getAllResults();

			setResults(res.winners);
		} catch (error) {
			setResults([]);
		}
	};

	return (
		<>
			<AllResults results={currentData} />
			<Pagination
				className="pagination-bar"
				currentPage={currentPage}
				totalCount={results.length}
				pageSize={PAGE_SIZE}
				onPageChange={(page) => setCurrentPage(page)}
			/>
		</>
	);
});
