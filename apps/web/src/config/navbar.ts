import { BiBox, BiHome, BiSupport } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";

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
		icon: TbCurrencyRupeeNepalese,
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
