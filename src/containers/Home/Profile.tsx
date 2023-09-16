import React from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { Button, Grid } from "@mui/material";
import { upload } from "../../redux/slices/user.slice";
import { useAppDispatch } from "../../redux/store";
import { useSnackbar } from "notistack";
import ImageUpload from "../../components/ImageUpload";

const Profile = () => {
	const dispatch = useAppDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const user = useSelector((state: RootState) => state.user);
	const [pictureUrl, setPictureUrl] = React.useState("");

	const uploadPicture = async () => {
		try {
			if (pictureUrl.length == 0) {
				enqueueSnackbar("Please Select a File First", {
					variant: "error",
				});
				return;
			}
			dispatch(upload({ picture: pictureUrl, id: user.data && user.data._id }))
				.unwrap()
				.then((res) => {
					if (!res.status) {
						enqueueSnackbar(res?.message, {
							variant: res.status ? "success" : "error",
						});
						return;
					}
				})
				.catch(() => {
					enqueueSnackbar("Error", {
						variant: "error",
					});
				});
		} catch (error) {
			enqueueSnackbar("error",{
				variant:"error"
			})
		}
	};

	return (
		<>
			<h4>Update Profile</h4>
			<Grid container spacing={3}>
				<Grid item lg={6} md={6} xs={12}>
					<h5>Current Profile Pic</h5>
					<img
						style={{
							height: "300px",
							width: "300px",
						}}
						src={(user.data && user.data.picture) || "/images/placeholder.jpg"}
					/>
				</Grid>
				<Grid item lg={6} md={6} xs={12}>
					<ImageUpload type="Profile" setImage={setPictureUrl} />
					<Button
						sx={{
							marginTop: "10px",
							fontWeight: "bold",
							width: "100%",
							bgcolor: "#000",
							"&:hover": {
								backgroundColor: "#2CF5BA",
								color: "#000",
							},
						}}
						size="medium"
						type="submit"
						variant="contained"
						onClick={uploadPicture}
					>
						Upload Picture
					</Button>
				</Grid>
			</Grid>
		</>
	);
};

export default React.memo(Profile);
