import RequestCard from "../../components/RequestCard";
import { Grid } from "@mui/material";
import React from "react";
import * as AdminService from "../../services/AdminService";

const Requests = () => {

	const [requests, setRequests] = React.useState([]);

  const setNewRequest= React.useCallback((item:any)=>{
    setRequests(item)
  },[])

	React.useEffect(() => {
		getRequests();
	}, []);

	const getRequests = async () => {
		try {
			const res = await AdminService.getAllRequests();
			if (res) {
				setRequests(res.candidates);
			}
		} catch (error) {
			setRequests([]);
		}
	};

	return (
		<Grid container spacing={2}>
			{requests.length > 0 ?
				requests.map((item: any) => (
					<Grid key={item.id} item lg={6} md={6} sm={4} xs={12}>
						<RequestCard
              setRequests={setNewRequest}
							id={item._id}
							picture={item.user.picture}
							name={item.user.name}
							email={item.user.email}
						/>
					</Grid>
				)):
        <h1>No Requests</h1>}
		</Grid>
	);
};

export default React.memo(Requests);
