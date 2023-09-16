import React from 'react'
import { Grid } from "@mui/material";
import ResultCard from "./ResultCard";
interface IProps {
	results: any[];
}

export const AllResults = React.memo((props: IProps) => {
	const { results } = props;
	return (
		<>
			<Grid container spacing={2}>
				{results.length > 0 ? (
					results.map((item: any) => (
						<Grid key={item?._id} item lg={6} md={6} sm={6} xs={12}>
							<ResultCard
								constituency={item.constituency.name}
								name={item?.winner.user[0].name}
								totalVotes={item?.totalVotes}
								votesToWinner={item?.votesToWinner}
								picture={item?.winner.user[0].picture}
							/>
						</Grid>
					))
				) : (
					<h1>No Results</h1>
				)}
			</Grid>
		</>
	);
});
