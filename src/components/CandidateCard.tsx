import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface IProps {
	name: string;
	email: string;
	type: string;
}

const CandidateCard = (props: IProps) => {
	const { name, email, type } = props;
	return (
		<Card sx={{ width: "300px" }}>
			<CardMedia
				sx={{ height: 140 }}
				image={"/images/placeholder.jpg"}
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
			{type == "admin" && (
				<CardActions>
					<Button size="small">Edit</Button>
					<Button size="small">Delete</Button>
				</CardActions>
			)}
		</Card>
	);
};

export default CandidateCard;
