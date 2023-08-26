"use client";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Navbar() {
	const { data: session, status } = useSession();

	const pathname = usePathname();
	const router = useRouter();

	const [menuOpen, setMenuOpen] = useState(null);

	const handleMenuOpen = (event) => {
		setMenuOpen(event.currentTarget);
	};

	const handleMenuClose = () => {
		setMenuOpen(null);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={handleMenuOpen} // Open the dropdown menu
					>
						<MenuIcon />
					</IconButton>

					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						{/* Remove the "Game" link */}
					</Typography>
					{session ? (
						<>
							{/* Align the buttons to the right */}
							<Box sx={{ ml: "auto" }}>
								{pathname === "/" ? (
									<Button
										color="inherit"
										onClick={() => router.push(`/profile`)}
									>
										Profile
									</Button>
								) : (
									<Button
										color="inherit"
										onClick={() => {
											router.push(`/`);
										}}
									>
										Home
									</Button>
								)}
								<Button color="inherit" onClick={() => signOut()}>
									Logout
								</Button>
							</Box>
						</>
					) : status === "loading" ? (
						<CircularProgress color="inherit" />
					) : (
						<Button color="inherit" onClick={() => signIn("google")}>
							Login
						</Button>
					)}
				</Toolbar>
			</AppBar>
			<Menu
				anchorEl={menuOpen}
				open={Boolean(menuOpen)}
				onClose={handleMenuClose}
			>
				<MenuItem
					onClick={() => {
						router.push("/game");
						handleMenuClose();
					}}
				>
					Game
				</MenuItem>
			</Menu>
		</Box>
	);
}
