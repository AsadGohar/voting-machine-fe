import React from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import * as ConstituencyService from "../../services/ConstituencyService";
import * as AdminService from "../../services/AdminService";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { InviteSchema } from "../../utils/validations";

const InviteForm = () => {
	const [constituencies, setConstituencies] = React.useState([]);

	React.useEffect(() => {
		fetchAllConstituencies();
	}, []);

	const formik = useFormik({
		initialValues: {
			constituency: "",
			cnic: "",
		},
		validationSchema: InviteSchema,
		enableReinitialize: true,
		onSubmit: async (values) => {
			try {
				const res = await AdminService.sendInvite(values);
				enqueueSnackbar(res.message, {
					variant: "success",
				});
			} catch (error) {
				if (error instanceof AxiosError) {
					enqueueSnackbar(error.response?.data.message, {
						variant: "error",
					});
				} else {
					enqueueSnackbar("Error While Inviting", {
						variant: "error",
					});
				}
			}
		},
	});

	const fetchAllConstituencies = async () => {
		try {
			const res = await ConstituencyService.getAll();
			setConstituencies(res.constituencies);
		} catch (error) {
			setConstituencies([]);
		}
	};
	return (
		<>
			<h1>Invite User</h1>
			<form onSubmit={formik.handleSubmit}>
				<TextField
					sx={{
						textAlign: "left",
						marginTop: "5px",
						width: "100%",
					}}
					value={formik.values.constituency}
					name="constituency"
					onChange={formik.handleChange}
					select
					label="Constituency"
					error={
						formik.touched.constituency && Boolean(formik.errors.constituency)
					}
					helperText={formik.touched.constituency && formik.errors.constituency}
				>
					{constituencies.length > 0 ? (
						constituencies.map((item: any) => {
							return (
								<MenuItem key={item._id} value={item._id}>
									{item.name}
								</MenuItem>
							);
						})
					) : (
						<div></div>
					)}
				</TextField>
				<TextField
					fullWidth
					name="cnic"
					label="National Identification"
					value={formik.values.cnic}
					onChange={formik.handleChange}
					error={formik.touched.cnic && Boolean(formik.errors.cnic)}
					helperText={formik.touched.cnic && formik.errors.cnic}
					sx={{ margin: "10px 0" }}
				/>
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
					Send Invite
				</Button>
			</form>
		</>
	);
};

export default React.memo(InviteForm);
