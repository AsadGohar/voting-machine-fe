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

const drawerWidth = 240;

const Home = () => {
	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<Drawer
				variant="permanent"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
			>
				<Toolbar />
				<Box sx={{ overflow: "auto" }}>
					<List>
						{[
							{ name: "Cast Vote", to: "/home/vote" },
							{ name: "Candidates", to: "/home/candidates" },
							{ name: "Become Candidate", to: "/home/upgrade" },
							{ name: "Profile", to: "/home/profile" },
							{ name: "Results", to: "/home/results" },
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

export default React.memo(Home);
