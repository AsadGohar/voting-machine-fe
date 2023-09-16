import * as React from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import * as VotingService from "../../services/VotingService";
import * as UserService from "../../services/UserService";
import * as ElectionService from "../../services/ElectionService";
import { AxiosError } from "axios";
import { CastVoteSchema } from "../../utils/validations";
import ElectionDetails from "../../components/ElectionDetails";

const Vote = () => {
	const { enqueueSnackbar } = useSnackbar();
	const user = useSelector((state: RootState) => state.user);
	const [candidates, setCandidates] = React.useState([]);
	const [election, setElection] = React.useState<any>({});

	React.useEffect(() => {
		const fetchAllCandidates = async () => {
			try {
				if (user.data) {
					const res = await UserService.getCandidatesByUserId(user.data._id);
					setCandidates(res.candidates);
				}
			} catch (error) {
				setCandidates([]);
			}
		};

		const fetchActiveElection = async () => {
			try {
				const res = await ElectionService.getActiveElection();
				setElection(res.election);
			} catch (error) {
				setElection({});
			}
		};
		fetchAllCandidates();
		fetchActiveElection();
	}, [user.data]);

	const getResult = async () => {
		try {
			if (user.data) {
				const res = await VotingService.getResultsByConstituency({
					electionId: election?._id,
					constituencyId: user.data.constituency,
				});
				if (res.status) {
					enqueueSnackbar(res.message, {
						variant: "success",
					});
				}
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				enqueueSnackbar(error.response?.data.message, {
					variant: "error",
				});
			} else {
				enqueueSnackbar("Error fetching results", {
					variant: "error",
				});
			}
		}
	};

	const formik = useFormik({
		initialValues: {
			candidateId: "",
		},
		enableReinitialize: true,
		validationSchema: CastVoteSchema,
		onSubmit: async (values) => {
			if (user.data) {
				try {
					const res = await VotingService.castVote({
						candidateId: values.candidateId,
						userId: user.data._id,
					});
					enqueueSnackbar(res.message, {
						variant: res.status ? "success" : "error",
					});
				} catch (error) {
					if (error instanceof AxiosError) {
						enqueueSnackbar(error.response?.data.message, {
							variant: "error",
						});
					} else {
						enqueueSnackbar("Error While Casting Vote", {
							variant: "error",
						});
					}
				}
			}
		},
	});
	return (
		<Box>
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

			{candidates.length > 0 ? (
				<>
					<h1>Cast Your Vote</h1>
					<form onSubmit={formik.handleSubmit}>
						<Grid container spacing={0}>
							<Grid item xs={12}>
								<TextField
									sx={{
										textAlign: "left",
										marginTop: "5px",
										width: "100%",
									}}
									defaultValue={""}
									name="candidateId"
									onChange={formik.handleChange}
									select
									label="Candidate"
									error={
										formik.touched.candidateId &&
										Boolean(formik.errors.candidateId)
									}
									helperText={
										formik.touched.candidateId && formik.errors.candidateId
									}
								>
									{candidates.map((item: any) => {
										return (
											<MenuItem key={item._id} value={item._id}>
												{item.user.name}
											</MenuItem>
										);
									})}
								</TextField>
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
							Cast Vote
						</Button>
					</form>
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
						onClick={getResult}
						size="medium"
						variant="contained"
					>
						Fetch Voting Result
					</Button>{" "}
				</>
			) : (
				<h2>No Candidates</h2>
			)}
		</Box>
	);
};

export default React.memo(Vote);
