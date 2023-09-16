import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import * as AdminService from "../services/AdminService";
import { enqueueSnackbar } from "notistack";
interface IProps {
	setRequests: (item: any) => void;
	name: string;
	email: string;
	picture: string;
	id: string;
}

const RequestCard = (props: IProps) => {
	const { id, name, email, picture, setRequests } = props;

	const approveCandidate = async () => {
		try {
			const res = await AdminService.approveCandidate(id);
			setRequests(res.candidates);
			enqueueSnackbar(res.message, {
				variant: "success",
			});
		} catch (error) {
			enqueueSnackbar("Error While Approving Candidate", {
				variant: "error",
			});
		}
	};

	return (
		<Card sx={{ width: "300px" }}>
			<CardMedia
				sx={{ height: 140 }}
				image={picture || "/images/placeholder.jpg"}
				title="green iguana"
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{name}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{email}
				</Typography>
			</CardContent>
			<CardActions>
				<Button onClick={approveCandidate} size="small">
					Approve
				</Button>
			</CardActions>
		</Card>
	);
};

export default RequestCard;
