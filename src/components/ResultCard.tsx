import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface IProps {
	name: string;
	picture: string;
	votesToWinner: number;
	totalVotes: number;
	constituency: string;
}

const ResultCard = (props: IProps) => {
	const { name, totalVotes, votesToWinner, picture, constituency } = props;
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
				<Typography gutterBottom variant="h5" component="div">
					{constituency}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{`My Votes: ${votesToWinner}`}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{`Total Votes: ${totalVotes}`}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default ResultCard;
