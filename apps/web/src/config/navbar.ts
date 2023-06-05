import { BiBox, BiHome, BiSupport } from "react-icons/bi";
import { BsCurrencyDollar } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";

const NAVLINKS = [
	{
		label: "Home",
		href: "/",
		icon: BiHome,
	},
	{
		label: "Shipping",
		href: "/create-order",
		icon: BiBox,
	},
	{
		label: "Quote",
		href: "/quote",
		icon: BsCurrencyDollar,
	},
	{
		label: "Tracking",
		href: "/tracking",
		icon: HiOutlineLocationMarker,
	},
	{
		label: "Support",
		href: "/support",
		icon: BiSupport,
	},
];

export default NAVLINKS;
