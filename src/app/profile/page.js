"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Skeleton } from "@mui/material";
const profile = () => {
	const [loading, setLoading] = useState(true);
	const { data: session, status } = useSession();

	useEffect(() => {
		if (status === "loading") return;
		setLoading(false);
	}
		, [status]);

	if (loading) return (

		<>
			<Skeleton variant="rounded" width="100%" height={80} sx={{ bgcolor: "grey.900", marginTop: ".875rem" }} />
			<Skeleton variant="rounded" width="100%" height={80} sx={{ bgcolor: "grey.900", marginTop: ".875rem" }} />
		</>

	);





	return (
		<>
			<h2>Profile Page</h2>
			<h3>This page is rendered on the client.</h3>

			<p>
				<strong>Status:</strong> {status}
			</p>
			<p>
				<strong>Session:</strong> {JSON.stringify(session, null, 2)}
			</p>
		</>
	);
};

export default profile;
