import * as AdminService from "../../services/AdminService";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { CreateElectionSchema } from "../../utils/validations";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import * as ElectionService from "../../services/ElectionService";
import { Grid } from "@mui/material";
import React from "react";
import ElectionDetails from "../../components/ElectionDetails";

export const Election = React.memo(() => {
	const [election, setElection] = React.useState<any>(null);

	React.useEffect(() => {
		const getCurrentElection = async () => {
			try {
				const res = await ElectionService.getActiveElection();
				if (res && res.election !== election) {
					setElection(res.election);
				}
			} catch (error) {
				setElection(null);
			}
		};

		getCurrentElection();
	}, [election]);

	const editformik = useFormik({
		initialValues: {
			startDate: null,
			endDate: null,
		},
		enableReinitialize: true,
		onSubmit: async (values) => {
			if (!values.endDate || !values.startDate) {
				enqueueSnackbar("Select Both Dates", {
					variant: "error",
				});
				return;
			}
			const newStartDate = new Date(values.startDate);
			const newEndDate = new Date(values.endDate);

			if (newStartDate > newEndDate) {
				enqueueSnackbar("Start Date Cannot Be Bigger than End Date", {
					variant: "error",
				});
				return;
			} else if (newEndDate < newStartDate) {
				enqueueSnackbar("End Date Cannot Be Less than Start Date", {
					variant: "error",
				});
				return;
			}
			try {
				const response = await AdminService.editElection(values);
				if (response.status) {
					enqueueSnackbar("Election Updated", {
						variant: "success",
					});
				}
			} catch (error) {
				if (error instanceof AxiosError) {
					enqueueSnackbar(error.response?.data.message, {
						variant: "error",
					});
				} else {
					enqueueSnackbar("Error while Updating election", {
						variant: "error",
					});
				}
			}
		},
	});

	const formik = useFormik({
		initialValues: {
			name: "",
			startDate: null,
		},
		enableReinitialize: true,
		validationSchema: CreateElectionSchema,
		onSubmit: async (values) => {
			if (!values.startDate) {
				enqueueSnackbar("Select Start Date", {
					variant: "error",
				});
				return;
			}
			try {
				const response = await AdminService.startElection(values);
				if (response.status) {
					enqueueSnackbar("Election Created", {
						variant: "success",
					});
				}
			} catch (error) {
				if (error instanceof AxiosError) {
					enqueueSnackbar(error.response?.data.message, {
						variant: "error",
					});
				} else {
					enqueueSnackbar("Error while starting election", {
						variant: "error",
					});
				}
			}
		},
	});

	return (
		<>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6} md={6} lg={6}>
					{election ? (
						<>
							<h4>Current Election</h4>
							<ElectionDetails
								startDate={String(election.startDate).slice(0, 10)}
								endDate={String(election.endDate).slice(0, 10)}
							/>
						</>
					) : (
						<h5>No Current Election</h5>
					)}
				</Grid>
				<Grid item xs={12} sm={6} md={6} lg={6}>
					<h4>Create Election</h4>
					<form onSubmit={formik.handleSubmit}>
						<TextField
							fullWidth
							name="name"
							label="Election Name"
							value={formik.values.name}
							onChange={formik.handleChange}
							error={formik.touched.name && Boolean(formik.errors.name)}
							helperText={formik.touched.name && formik.errors.name}
							sx={{ margin: "10px 0" }}
						/>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DemoContainer components={["DatePicker"]}>
								<DatePicker
									sx={{
										width: "100%",
									}}
									value={formik.values.startDate}
									onChange={(value) =>
										formik.setFieldValue("startDate", value, true)
									}
									label="Select Start Date"
								/>
							</DemoContainer>
						</LocalizationProvider>
						<Button
							sx={{
								padding: "10px",
								marginTop: "10px",
								fontWeight: "bold",
								width: "100%",
								bgcolor: "#000",
								"&:hover": {
									backgroundColor: "#2CF5BA",
									color: "#000",
								},
							}}
							type="submit"
							size="medium"
							variant="contained"
						>
							Create Election
						</Button>
					</form>
				</Grid>
				<Grid item xs={12} sm={6} md={6} lg={6}>
					<h4>Edit Election</h4>
					<form onSubmit={editformik.handleSubmit}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DemoContainer components={["DatePicker"]}>
								<DatePicker
									sx={{
										width: "100%",
									}}
									value={editformik.values.startDate}
									onChange={(value) =>
										editformik.setFieldValue("startDate", value, true)
									}
									label="Select Start Date"
								/>
							</DemoContainer>
						</LocalizationProvider>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DemoContainer components={["DatePicker"]}>
								<DatePicker
									sx={{
										width: "100%",
									}}
									value={editformik.values.endDate}
									onChange={(value) =>
										editformik.setFieldValue("endDate", value, true)
									}
									label="Select End Date"
								/>
							</DemoContainer>
						</LocalizationProvider>
						<Button
							sx={{
								padding: "10px",
								marginTop: "10px",
								fontWeight: "bold",
								width: "100%",
								bgcolor: "#000",
								"&:hover": {
									backgroundColor: "#2CF5BA",
									color: "#000",
								},
							}}
							type="submit"
							size="medium"
							variant="contained"
						>
							Edit Election
						</Button>
					</form>
				</Grid>
			</Grid>
		</>
	);
});
