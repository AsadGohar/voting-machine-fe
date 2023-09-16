import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function BasicCard() {
	return (
		<Card sx={{ minWidth: 275 }}>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					NA - 123
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Delete</Button>
				<Button size="small">Edit</Button>
			</CardActions>
		</Card>
	);
}
