import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
	name: Yup.string()
		.trim()
		.when("isSignup", {
			is: true,
			then: () => Yup.string().trim().required("name is required"),
		}),
	cnic: Yup.string()
		.trim()
		.when("isSignup", {
			is: true,
			then: () =>
				Yup.string()
					.trim()
					.matches(/^\d{5}-\d{7}-\d{1}$/, "invlid identification")
					.required("identification is required"),
		}),
	email: Yup.string()
		.trim()
		.email("invalid email")
		.required("email is Required"),
	constituency: Yup.string()
		.trim()
		.when("isSignup", {
			is: true,
			then: () => Yup.string().trim().required("constituency is required"),
		}),
	password: Yup.string()
		.trim()
		.min(8, "password too short")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&*])(?=.{8,})/,
			"password isn't strong enough"
		)
		.required("password is required"),
});

export const LoginSchema = Yup.object().shape({
	name: Yup.string()
		.trim()
		.when("isSignup", {
			is: true,
			then: () => Yup.string().trim().required("name is required"),
		}),
	email: Yup.string()
		.trim()
		.email("invalid email")
		.required("email is Required"),
	consituency: Yup.string()
		.trim()
		.when("isSignup", {
			is: true,
			then: () => Yup.string().trim().required("name is required"),
		}),
	password: Yup.string().trim().required("password is required"),
});

export const CastVoteSchema = Yup.object().shape({
	candidateId: Yup.string().trim().required("candidate is required"),
});

export const BecomeCandidateSchema = Yup.object().shape({
	partyName: Yup.string().trim().required("party is required"),
});

export const CreateConstituencySchema = Yup.object().shape({
	name: Yup.string().trim().required("name is required"),
	location: Yup.string().trim().required("location is required"),
});

export const InviteSchema = Yup.object().shape({
	constituency: Yup.string().trim().required("constituency is required"),
	cnic: Yup.string().trim().required("cnic is required"),
});

export const CreateElectionSchema = Yup.object().shape({
	name: Yup.string().trim().required("name is required"),
});

export const EditElectionSchema = Yup.object().shape({
	startDate: Yup.date().required("start date is required"),
	endDate: Yup.date().required("end date is required"),
});
