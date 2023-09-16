import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { RootState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { logout } from "../redux/slices/user.slice";
import { useNavigate, NavLink } from "react-router-dom";

const Navbar = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useSelector((state: RootState) => state.user);
	const logoutUser = () => {
		dispatch(logout());
		navigate("/");
	};
	return (
		<AppBar
			position="fixed"
			sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "#000" }}
		>
			<Toolbar>
				<NavLink
					style={{
						color: "white",
					}}
					to="/"
				>
					<Typography
						sx={{
							fontWeight: "bold",
						}}
						variant="h6"
						noWrap
						component="div"
					>
						{user && user?.data?.role == "admin" ? "ADMIN" : "VOTELY"}
					</Typography>
				</NavLink>
				{user?.data?.role && (
					<Typography
						sx={{
							fontWeight: "bold",
							marginLeft: "5px",
						}}
						variant="h6"
						noWrap
						component="div"
					>
						{" "}
						{""} status : {""}
						{user?.data?.role}
					</Typography>
				)}
				{user?.data?.role && (
					<Button
						sx={{
							marginLeft: "50px",
							padding: "10px",
							marginTop: "10px",
							fontWeight: "bold",
							width: "100px",
							backgroundColor: "#2CF5BA",
							color: "#000",
							"&:hover": {
								backgroundColor: "#fff",
								color: "#000",
							},
						}}
						onClick={logoutUser}
						size="medium"
						variant="contained"
					>
						Logout
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
