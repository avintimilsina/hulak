// ? This function is used to calculate the postage cost based on the package's weight, dimensions, and distance between the source and destination addresses.
interface CalculatePostageOption {
	isLithiumIncluded: boolean;
	isSignatureIncluded: boolean;
	isOversizedPackageIncluded: boolean;
	isDryIceIncluded: boolean;
}
const calculatePostage = async (
	packageHeight: number,
	packageWeight: number,
	packageLength: number,
	packageWidth: number,
	sourceAddressLine1: string,
	destinationAddressLine1: string,
	options?: CalculatePostageOption
) => {
	// fetch source and destination location data from openweathermap api to calculate distance between the two locations using longitude and latitude
	const sourceResult = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${sourceAddressLine1}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`
	);
	const sourceData = await sourceResult.json();

	const destinationResult = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${destinationAddressLine1}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`
	);
	const destinationData = await destinationResult.json();

	// calculate distance between the two locations using longitude and latitude
	const R = 6371e3; // metres
	const φ1 = (sourceData.coord.lat * Math.PI) / 180; // φ, λ in radians
	const φ2 = (destinationData.coord.lat * Math.PI) / 180;
	const Δφ =
		((destinationData.coord.lat - sourceData.coord.lat) * Math.PI) / 180;
	const Δλ =
		((destinationData.coord.lon - sourceData.coord.lon) * Math.PI) / 180;

	const a =
		Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
		Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	const distance = (1.5 * (R * c)) / 1000; // in metres

	const volume = packageHeight * packageLength * packageWidth;

	// calculate postage cost based on distance, package weight, and volume and options
	const postageCost =
		distanceToUnitPrice(distance) *
		packageWeight *
		volumeMultiplier(volume) *
		optionsMultiplier(options);

	return { postageCost, distance, volume };
};
export default calculatePostage;

// gives a unit price based on distance range
const distanceToUnitPrice = (distance: number) => {
	if (distance > 0 && distance < 10) {
		return 100;
	}
	if (distance > 10 && distance < 30) {
		return 200;
	}
	if (distance > 30 && distance < 50) {
		return 300;
	}
	if (distance > 50 && distance < 100) {
		return 400;
	}
	return 500;
};

// gives a multiplier based on volume range
const volumeMultiplier = (volume: number) => {
	if (volume > 0 && volume < 8000) {
		return 1;
	}
	if (volume > 8000 && volume < 20000) {
		return 1.5;
	}
	if (volume > 20000 && volume < 50000) {
		return 2;
	}
	if (volume > 50000 && volume < 100000) {
		return 2.5;
	}
	return 3;
};

// gives a multiplier based on options
const optionsMultiplier = (options: CalculatePostageOption | undefined) => {
	let multiplier = 1;
	if (options?.isLithiumIncluded) {
		multiplier += 0.3;
	}
	if (options?.isSignatureIncluded) {
		multiplier += 0.3;
	}
	if (options?.isOversizedPackageIncluded) {
		multiplier += 0.3;
	}
	if (options?.isDryIceIncluded) {
		multiplier += 0.3;
	}
	return multiplier;
};
