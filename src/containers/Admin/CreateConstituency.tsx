import React from "react";
import { Box, TextField, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import * as ConstituencyService from "../../services/ConstituencyService";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { CreateConstituencySchema } from "../../utils/validations";

const CreateConstituency = React.memo(() => {
	const formik = useFormik({
		initialValues: {
			name: "",
			location: "",
		},
		enableReinitialize: true,
		validationSchema: CreateConstituencySchema,
		onSubmit: async (values) => {
			try {
				const res = await ConstituencyService.create(values);
				enqueueSnackbar(res.message, {
					variant: res.status ? "success" : "error",
				});
			} catch (error) {
				if (error instanceof AxiosError)
					enqueueSnackbar(error.response?.data.message, {
						variant: "error",
					});
			}
		},
	});
	return (
		<Box>
			<h1>Create New Constituency</h1>
			<form onSubmit={formik.handleSubmit}>
				<Grid container spacing={0}>
					<Grid item xs={12}>
						<TextField
							fullWidth
							name="name"
							label="Name"
							value={formik.values.name}
							onChange={formik.handleChange}
							error={formik.touched.name && Boolean(formik.errors.name)}
							helperText={formik.touched.name && formik.errors.name}
							sx={{ margin: "10px 0" }}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							name="location"
							label="Location"
							value={formik.values.location}
							onChange={formik.handleChange}
							error={formik.touched.location && Boolean(formik.errors.location)}
							helperText={formik.touched.location && formik.errors.location}
							sx={{ margin: "10px 0" }}
						/>
					</Grid>
				</Grid>
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
				>
					Create Constituency
				</Button>
			</form>
		</Box>
	);
});

export default CreateConstituency;
