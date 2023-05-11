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
	const sourceLongitude = sourceData.coord.lon;
	const sourceLatitude = sourceData.coord.lat;
	console.log("sourceLatitude", sourceLatitude);
	console.log("sourceLongitude", sourceLongitude);

	const destinationResult = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${destinationAddressLine1}&appid=e167a121565880362a4769a2e4acf518`
	);
	const destinationData = await destinationResult.json();
	const destinationLongitude = destinationData.coord.lon;
	const destinationLatitude = destinationData.coord.lat;
	console.log("destinationLatitude", destinationLatitude);
	console.log("destinationLongitude", destinationLongitude);

	// const distance =
	// 	Math.acos(
	// 		Math.sin(sourceLatitude) * Math.sin(destinationLatitude) +
	// 			Math.cos(sourceLatitude) *
	// 				Math.cos(destinationLatitude) *
	// 				Math.cos(destinationLongitude - sourceLongitude)
	// 	) * 6371;
	const R = 6371e3; // metres
	const φ1 = (sourceLatitude * Math.PI) / 180; // φ, λ in radians
	const φ2 = (destinationLatitude * Math.PI) / 180;
	const Δφ = ((destinationLatitude - sourceLatitude) * Math.PI) / 180;
	const Δλ = ((destinationLongitude - sourceLongitude) * Math.PI) / 180;

	const a =
		Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
		Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	const distance = (1.5 * (R * c)) / 1000; // in metres

	console.log("distance", distance);

	const volume = packageHeight * packageLength * packageWidth;
	console.log("volume", volume);

	const postageCost = distance * volume * packageWeight;
	console.log("postageCost", postageCost);

	return postageCost;
};
export default calculatePostage;
