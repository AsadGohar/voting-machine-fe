import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";

interface IProps {
	children?: ReactNode;
	role: string[];
}

const ProtectedRoute = ({ children, role }: IProps) => {
	const user: any = useSelector(
		(state: RootState) => state.user || localStorage.getItem(user)
		);
	if (!user.data) {
		return <Navigate to="/" replace />;
	}
	if (user && !role.includes(user.data.role)) {
		return <Navigate to="/" replace />;
	}
	return children;
};
export default ProtectedRoute;
