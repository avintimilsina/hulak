/* eslint-disable no-console */
const calculatePostage = async (
	packageHeight: number,
	packageWeight: number,
	packageLength: number,
	packageWidth: number,
	sourceAddressLine1: string,
	destinationAddressLine1: string
) => {
	const sourceResult = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${sourceAddressLine1}&appid=e167a121565880362a4769a2e4acf518`
	);
	const sourceData = await sourceResult.json();

	const destinationResult = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${destinationAddressLine1}&appid=e167a121565880362a4769a2e4acf518`
	);
	const destinationData = await destinationResult.json();

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

	const postageCost = distance * volume * packageWeight;

	return { postageCost, distance, volume };
};
export default calculatePostage;
