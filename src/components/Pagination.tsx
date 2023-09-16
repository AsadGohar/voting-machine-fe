import classnames from "classnames";
import { usePagination, DOTS } from "../hooks/usePagination";
import "../styles/pagination.css";

interface IProps {
	onPageChange: (num: number) => void;
	totalCount: number;
	siblingCount?: number;
	currentPage: number;
	pageSize: number;
	className: string;
}


const Pagination = (props: IProps) => {
	const {
		onPageChange,
		totalCount,
		siblingCount = 1,
		currentPage,
		pageSize,
		className,
	} = props;

	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});

	if (currentPage === 0 || (paginationRange && paginationRange?.length < 2)) {
		return null;
	}

	const onNext = () => {
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};

	const lastPage = paginationRange && paginationRange[paginationRange.length - 1];
	return (
		<ul
			className={classnames("pagination-container", { [className]: className })}
		>
			<li
				className={classnames("pagination-item", {
					disabled: currentPage === 1,
				})}
				onClick={onPrevious}
			>
				<div className="arrow left" />
			</li>
			{paginationRange &&
				paginationRange.map((pageNumber) => {
					if (pageNumber === DOTS) {
						return <li className="pagination-item dots">&#8230;</li>;
					}

					return (
						<li
							className={classnames("pagination-item", {
								selected: pageNumber === currentPage,
							})}
							onClick={() => onPageChange(Number(pageNumber))}
						>
							{pageNumber}
						</li>
					);
				})}
			<li
				className={classnames("pagination-item", {
					disabled: currentPage === lastPage,
				})}
				onClick={onNext}
			>
				<div className="arrow right" />
			</li>
		</ul>
	);
};

export default Pagination;
