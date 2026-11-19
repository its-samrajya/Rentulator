"use client";

import { useEffect, useState } from "react";

const timeFormatter = new Intl.DateTimeFormat("en-US", {
	timeZone: "Asia/Kathmandu",
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
	hour12: true,
});

export const LiveTime = ({ className }: { className?: string }) => {
	const [now, setNow] = useState<Date | null>(null);

	useEffect(() => {
		setNow(new Date());
		const id = setInterval(() => setNow(new Date()), 1000);
		return () => clearInterval(id);
	}, []);

	return (
		<time className={className} dateTime={now?.toISOString()}>
			{now ? timeFormatter.format(now) : "--:--:-- --"}
		</time>
	);
};
