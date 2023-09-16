import React from 'react'
import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, Outlet } from "react-router-dom";
import { DRAWER_WIDTH } from '../../utils/consts';
DRAWER_WIDTH

const Admin = () => {
	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<Drawer
				variant="permanent"
				sx={{
					width: DRAWER_WIDTH,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: DRAWER_WIDTH,
						boxSizing: "border-box",
					},
				}}
			>
				<Toolbar />
				<Box sx={{ overflow: "auto" }}>
					<List>
						{[
							{ name: "Candidates", to: "/admin/candidates" },
							{ name: "Create Constituency", to: "/admin/create-constituency" },
							{ name: "Voters", to: "/admin/voters" },
							{ name: "Requests", to: "/admin/requests" },
							{ name: "Invite User", to: "/admin/invite" },
							{ name: "Election", to: "/admin/election" },
							{ name: "Results", to: "/admin/results" },
						].map((item, index) => (
							<Link key={index} className="link-text" to={item.to}>
								<ListItem key={item.name} disablePadding>
									<ListItemButton>
										<ListItemIcon>
											{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
										</ListItemIcon>
										<ListItemText primary={item.name} />
									</ListItemButton>
								</ListItem>
							</Link>
						))}
					</List>
				</Box>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<>
					<Outlet />
				</>
			</Box>
		</Box>
	);
};

export default React.memo(Admin);
