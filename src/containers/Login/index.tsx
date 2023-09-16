import * as React from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { SignUpSchema, LoginSchema } from "../../utils/validations";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../../redux/slices/user.slice";
import { useSnackbar } from "notistack";
import { useAppDispatch } from "../../redux/store";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import * as ConstituencyService from "../../services/ConstituencyService";
import { AxiosError } from "axios";

export const Login = React.memo(() => {
	const nav = useNavigate();

	const user = useSelector((state: RootState) => state.user);
	const [constituencies, setConstituencies] = React.useState([]);

	React.useEffect(() => {
		if (user.data && user.data.role == "admin") {
			nav("/admin");
		} else if (user.data && user.data.role == "voter") {
			nav("/home");
		}
	}, [nav, user]);

	React.useEffect(() => {
		fetchAllConstituencies();
	}, []);

	const fetchAllConstituencies = async () => {
		try {
			const res = await ConstituencyService.getAll();
			setConstituencies(res.constituencies);
		} catch (error) {
			setConstituencies([]);
		}
	};

	const dispatch = useAppDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const [signupForm, setSignUpForm] = React.useState(true);
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
			constituency: "",
			cnic: "",
			isSignup: signupForm,
		},
		enableReinitialize: true,
		validationSchema: signupForm ? SignUpSchema : LoginSchema,
		onSubmit: (values) => {
			if (signupForm) {
				dispatch(signup({ ...values }))
					.unwrap()
					.then((res) => {
						if (!res.status) {
							enqueueSnackbar(res?.message, {
								variant: res.status ? "success" : "error",
							});
							return;
						}
						navigate(res.user.role == "admin" ? "/admin" : "/home/profile");
					})
					.catch(() => {
						enqueueSnackbar("Error", {
							variant: "error",
						});
					});
			} else {
				dispatch(login({ email: values.email, password: values.password }))
					.unwrap()
					.then((res) => {
						if (res instanceof AxiosError) {
							enqueueSnackbar(res.response?.data.message, {
								variant: "error",
							});
							return;
						}
						if (!res.status) {
							enqueueSnackbar("Error Loging In", {
								variant: "error",
							});
							return;
						}
						navigate(res.user.role == "admin" ? "/admin" : "/home");
					})
					.catch(() => {
						enqueueSnackbar("error",{
							variant:"error"
						})
					});
			}
		},
	});

	return (
		<Grid container spacing={2}>
			<Grid item lg={7} md={7} sm={7} xs={12}>
				<Box>
					<Typography
						sx={{ textAlign: "left", fontWeight: "bold", fontSize: "7rem" }}
						variant="h1"
						component="h1"
					>
						Make your voice{" "}
						<span
							style={{
								color: "#2CF5BA",
							}}
						>
							heard!
						</span>
					</Typography>
					<p
						style={{
							textAlign: "justify",
							width: "90%",
						}}
					>
						Welcome to Votely, the ultimate voting platform! Experience the
						power of democracy by registering to vote in a variety of elections.
						From local initiatives to national decisions, your opinion matters.
						Join us today and participate in shaping a brighter future for our
						community.Shape the future! Register now on Votely and join the
						democratic process to vote in upcoming elections
					</p>
				</Box>
			</Grid>
			<Grid item lg={5} md={5} sm={5} xs={12}>
				<Box>
					<form onSubmit={formik.handleSubmit}>
						<Grid container spacing={0}>
							{signupForm ? (
								<Grid item xs={12}>
									<TextField
										fullWidth
										name="name"
										label="Name"
										value={formik.values.name}
										onChange={formik.handleChange}
										error={
											signupForm &&
											formik.touched.name &&
											Boolean(formik.errors.name)
										}
										helperText={
											signupForm && formik.touched.name && formik.errors.name
										}
										sx={{ margin: "10px 0" }}
									/>
								</Grid>
							) : (
								<></>
							)}
							{signupForm ? (
								<Grid item xs={12}>
									<TextField
										fullWidth
										name="cnic"
										label="National Identification"
										value={formik.values.cnic}
										onChange={formik.handleChange}
										error={
											signupForm &&
											formik.touched.cnic &&
											Boolean(formik.errors.cnic)
										}
										helperText={
											signupForm && formik.touched.cnic && formik.errors.cnic
										}
										sx={{ margin: "10px 0" }}
									/>
								</Grid>
							) : (
								<></>
							)}
							<Grid item xs={12}>
								<TextField
									fullWidth
									name="email"
									label="Email"
									value={formik.values.email}
									onChange={formik.handleChange}
									error={formik.touched.email && Boolean(formik.errors.email)}
									helperText={formik.touched.email && formik.errors.email}
									sx={{ margin: "10px 0" }}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									name="password"
									label="Password"
									type="password"
									value={formik.values.password}
									onChange={formik.handleChange}
									error={
										formik.touched.password && Boolean(formik.errors.password)
									}
									helperText={formik.touched.password && formik.errors.password}
									sx={{ margin: "10px 0" }}
								/>
							</Grid>
							{signupForm ? (
								<Grid item xs={12}>
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
											signupForm &&
											formik.touched.constituency &&
											Boolean(formik.errors.constituency)
										}
										helperText={
											signupForm &&
											formik.touched.constituency &&
											formik.errors.constituency
										}
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
								</Grid>
							) : (
								<></>
							)}
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
							{signupForm ? "Sign Up" : "Login"}
						</Button>
					</form>
					{signupForm ? (
						<p className="mt-2 ">
							Already have an account?{" "}
							<span
								onClick={() => {
									setSignUpForm(false);
								}}
								className="signup-link"
							>
								Login
							</span>
						</p>
					) : (
						<p className="mt-2 ">
							Don't have an account?{" "}
							<span
								onClick={() => {
									setSignUpForm(true);
								}}
								className="signup-link"
							>
								Sign up
							</span>
						</p>
					)}
				</Box>
			</Grid>
		</Grid>
	);
});
