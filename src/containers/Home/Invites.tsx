import * as React from "react";
import InviteCard from "../../components/InviteCard";
import { Grid } from "@mui/material";
import * as InviteService from "../../services/InviteService";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

export const Invites = React.memo(() => {
	const user = useSelector((state: RootState) => state.user);
	const [invite, setInvite] = React.useState({});

	React.useEffect(() => {
		const fetchInvite = async () => {
			try {
				if (user.data) {
					const res = await InviteService.getInvites(user.data._id);
					setInvite(res.candidates);
				}
			} catch (error) {
				setInvite([]);
			}
		};
		fetchInvite();
	}, [user.data]);

	return (
		<Grid container spacing={2}>
			{Object.keys(invite).length > 0 && user.data ? (
				<InviteCard id={user.data._id} />
			) : (
				<h2>No Invite</h2>
			)}
		</Grid>
	);
});
