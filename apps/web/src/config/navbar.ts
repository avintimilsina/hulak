import {
	HiCurrencyDollar,
	HiHome,
	HiOutlineLocationMarker,
	HiOutlineQuestionMarkCircle,
} from "react-icons/hi";

// ? It contains the navbar links with their respective icons, labels and hrefs

const NAVLINKS = [
	{
		label: "Home",
		href: "/",
		icon: HiHome,
	},
	{
		label: "Quote",
		href: "/quote",
		icon: HiCurrencyDollar,
	},
	{
		label: "Track",
		href: "/tracking",
		icon: HiOutlineLocationMarker,
	},
	{
		label: "Support",
		href: "/support",
		icon: HiOutlineQuestionMarkCircle,
	},
];

export default NAVLINKS;
