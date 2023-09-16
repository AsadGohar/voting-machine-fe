import VoterCard from "../../components/VoterCard";
import { Grid } from "@mui/material";
import React from "react";
import * as AdminService from "../../services/AdminService";

const Voters = () => {
	const [voters, setVoters] = React.useState([]);

	React.useEffect(() => {
		getVoters();
	}, []);

	const getVoters = async () => {
		try {
			const res = await AdminService.getAllVoters();
			if (res) {
				setVoters(res.voters);
			}
		} catch (error) {
			setVoters([]);
		}
	};

	return (
		<Grid container spacing={2}>
			{voters.length > 0 &&
				voters.map((item: any) => (
					<Grid key={item.id} item lg={6} md={6} sm={6} xs={12}>
						<VoterCard
							cnic={item.cnic}
							picture={item.picture}
							name={item.name}
							email={item.email}
						/>
					</Grid>
				))}
		</Grid>
	);
};

export default React.memo(Voters);
