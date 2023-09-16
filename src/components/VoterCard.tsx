import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface IProps {
	name: string;
	email: string;
	picture:string;
	cnic:string
}

const VoterCard = (props: IProps) => {
	const { name, email, picture,cnic } = props;
	return (
		<Card sx={{ width:"350px" }}>
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
				<Typography variant="body2" color="text.secondary">
					{cnic}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default VoterCard;
