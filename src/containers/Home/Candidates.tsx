import React from "react";
import CandidateCard from "../../components/CandidateCard";
import { Grid } from "@mui/material";
import * as UserService from "../../services/UserService";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

export const UserCandidates = React.memo(() => {
	const user = useSelector((state: RootState) => state.user);
	const [candidates, setCandidates] = React.useState([]);

	React.useEffect(() => {
		const fetchAllCandidates = async () => {
			try {
				if(user.data){
					const res = await UserService.getCandidatesByUserId(user.data._id);
					setCandidates(res.candidates);
				}
			} catch (error) {
				setCandidates([]);
			}
		};
		fetchAllCandidates();
	}, [user.data]);

	

	return (
		<Grid container spacing={2}>
			{candidates.length > 0 ? (
				candidates.map((item: any) => (
					<Grid key={item?.user._id} item lg={6} md={6} sm={6} xs={12}>
						<CandidateCard
							type="user"
							name={item?.user.name}
							email={item?.user.email}
						/>
					</Grid>
				))
			) : (
				<h2>No Candidates</h2>
			)}
		</Grid>
	);
});
