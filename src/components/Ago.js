import ms from "ms";

export function getRelativeTimeAgo(prismaDateTime) {
	const parsedDate = new Date(prismaDateTime);
	const currentTime = new Date();
	const timeDifference = currentTime - parsedDate;

	const oneSecond = 1000;
	const oneMinute = 60 * oneSecond;
	const oneHour = 60 * oneMinute;
	const oneDay = 24 * oneHour;
	const oneWeek = 7 * oneDay;

	if (timeDifference < oneSecond) {
		return "Just now";
	} else if (timeDifference < oneMinute) {
		return ms(timeDifference, { long: true, unitCount: 1 }) + " ago";
	} else if (timeDifference < oneHour) {
		return ms(timeDifference, { long: true, unitCount: 1, short: true }) + " ago";
	} else if (timeDifference < oneDay) {
		return ms(timeDifference, { long: true, unitCount: 1, short: true }) + " ago";
	} else if (timeDifference < oneWeek) {
		return ms(timeDifference, { long: true, unitCount: 1, short: true }) + " ago";
	} else {
		return (
			ms(timeDifference, { long: false, unitCount: 1, short: true }) + " ago"
		);
	}
}
