import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import PageNotFound from "./components/PageNotFound";
import Admin from "./containers/Admin";
import { Login } from "./containers/Login";
import Navbar from "./components/Navbar";
import { Candidates } from "./containers/Admin/Candidates";
import { UserCandidates } from "./containers/Home/Candidates";
import Voters from "./containers/Admin/Voters";
import InviteForm from "./containers/Admin/InviteForm";
import Home from "./containers/Home";
import Vote from "./containers/Vote";
import Profile from "./containers/Home/Profile";
import BecomeCandidate from "./containers/BecomeCandidate";
import CreateConstituency from "./containers/Admin/CreateConstituency";
import Requests from "./containers/Admin/Requests";
import { Election } from "./containers/Admin/Election";
import { AdminResults } from "./containers/Admin/Results";
import { Results } from "./containers/Home/Results";
import "./App.css";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route
					path="/admin"
					element={
						<ProtectedRoute role={["admin"]}>
							<Admin />
						</ProtectedRoute>
					}
				>
					<Route path="candidates" element={<Candidates />} />
					<Route path="voters" element={<Voters />} />
					<Route path="create-constituency" element={<CreateConstituency />} />
					<Route path="requests" element={<Requests />} />
					<Route path="invite" element={<InviteForm />} />
					<Route path="election" element={<Election />} />
					<Route path="results" element={<AdminResults />} />
				</Route>
				<Route
					path="/home"
					element={
						<ProtectedRoute role={["voter", "candidate"]}>
							{<Home />}
						</ProtectedRoute>
					}
				>
					<Route path="candidates" element={<UserCandidates />} />
					<Route path="vote" element={<Vote />} />
					<Route path="profile" element={<Profile />} />
					<Route path="upgrade" element={<BecomeCandidate />} />
					<Route path="results" element={<Results />} />
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</>
	);
}

export default App;
