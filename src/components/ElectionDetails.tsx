interface IProps {
	startDate: string;
	endDate: string;
}

const ElectionDetails = (props: IProps) => {
	const { startDate, endDate } = props;
	return (
		<>
			<h4>Start Date: {startDate}</h4>
			<h4>End Date: {endDate}</h4>
		</>
	);
};

export default ElectionDetails;
