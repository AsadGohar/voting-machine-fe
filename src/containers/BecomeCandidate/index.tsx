import React from "react";
import { Box, TextField, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import * as CandidateService from "../../services/CandidateService";
import { AxiosError } from "axios";
import { BecomeCandidateSchema } from "../../utils/validations";
import ImageUpload from "../../components/ImageUpload";

const BecomeCandidate = () => {
	const user = useSelector((state: RootState) => state.user);
	const [pictureUrl, setPictureUrl] = React.useState("");

	const { enqueueSnackbar } = useSnackbar();

	const formik = useFormik({
		initialValues: {
			partyName: "",
			partyPicture: null,
		},
		enableReinitialize: true,
		validationSchema: BecomeCandidateSchema,
		onSubmit: async (values) => {
			// if (!values.partyPicture) {
			// 	enqueueSnackbar("Please Select File", {
			// 		variant: "error",
			// 	});
			// 	return;
			// }
			try {
				const response = await CandidateService.upgrade({
					user_id: user.data && user.data._id,
					party_name: values.partyName,
					pic_url: pictureUrl,
				});
				if (response) {
					enqueueSnackbar("Your request has been submitted", {
						variant: "success",
					});
				}
			} catch (error) {
				if (error instanceof AxiosError) {
					enqueueSnackbar(error.response?.data.message, {
						variant: "error",
					});
				} else {
					enqueueSnackbar("Failed to Upgrade", {
						variant: "error",
					});
				}
			}
		},
	});

	return (
		<Box>
			<h1>Become Candidate</h1>
			<form onSubmit={formik.handleSubmit}>
				<Grid container spacing={0}>
					<Grid item xs={12}>
						<Grid item xs={12}>
							<TextField
								fullWidth
								name="partyName"
								label="Party Name"
								value={formik.values.partyName}
								onChange={formik.handleChange}
								error={
									formik.touched.partyName && Boolean(formik.errors.partyName)
								}
								helperText={formik.touched.partyName && formik.errors.partyName}
								sx={{ margin: "10px 0" }}
							/>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<ImageUpload type="Party" setImage={setPictureUrl} />
					</Grid>
				</Grid>
				<Button
					sx={{
						marginTop: "40px",
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
				>
					Upgrade
				</Button>
			</form>
		</Box>
	);
};

export default React.memo(BecomeCandidate);
