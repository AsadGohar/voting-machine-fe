import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as InviteService from "../services/InviteService";
import { enqueueSnackbar } from "notistack";

interface IProps {
	id: string;
}

const CandidateCard = (props: IProps) => {
	const { id } = props;

	const acceptInvite = async () => {
		try {
			const res = await InviteService.accept(id);
			if(res.status){
				enqueueSnackbar("Invite Accepted")
			}
		} catch (error) {
			enqueueSnackbar("error while accpeting invite",{
				variant:"error"
			})
		}
	};

	return (
		<Card sx={{ width: "300px" }}>
			<CardMedia
				sx={{ height: 140 }}
				image={"/images/placeholder.jpg"}
				title="green iguana"
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					You Have Been Invited to Become An Admun
				</Typography>
			</CardContent>
			<CardActions>
				<Button onClick={acceptInvite} size="small">
					Accept
				</Button>
			</CardActions>
		</Card>
	);
};

export default CandidateCard;
