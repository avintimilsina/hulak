import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const LocaleSwitcher = () => {
	const router = useRouter();

	return (
		<Button
			variant="ghost"
			aria-label="Toggle Color Mode"
			_focus={{ boxShadow: "none" }}
			w="fit-content"
			onClick={() => {
				router.push(router.asPath, router.asPath, {
					locale: router.locale === "np" ? "en" : "np",
				});
			}}
		>
			{router.locale === "np" ? <AmericanFlag /> : <NepalFlag />}
		</Button>
	);
};

export default LocaleSwitcher;

export const NepalFlag = () => (
	<svg
		xmlnsXlink="http://www.w3.org/1999/xlink"
		xmlns="http://www.w3.org/2000/svg"
		version="1.1"
		width="24"
		height="24"
		viewBox="-17.582 -4.664 71.571 87.246"
	>
		<title>Flag of Nepal</title>
		<use xlinkHref="#a" stroke="#003893" strokeWidth="5.165" />
		<path
			id="a"
			d="M -15,37.5735931288 h 60 L -15,0 v 80 h 60 L -15,20 z"
			fill="#DC143C"
		/>
		<g fill="#fff">
			<path d="M -11.9502769431,23.4834957055 A 12.8400974233,12.8400974233 0 0,0 11.9502769431,23.4834957055 A 11.9502769431 11.9502769431 0 0,1 -11.9502769431,23.4834957055" />
			<g transform="translate(0 29.045) scale(5.56106)">
				<circle r="1" />
				<g id="d">
					<g id="c">
						<path
							id="b"
							d="M 0.195090322016,-0.980785280403 L 0,-1.388784109750 L -0.195090322016,-0.980785280403"
							transform="rotate(11.25)"
						/>
						<use xlinkHref="#b" transform="rotate(22.5)" />
						<use xlinkHref="#b" transform="rotate(45)" />
					</g>
					<use xlinkHref="#c" transform="rotate(67.5)" />
				</g>
				<use xlinkHref="#d" transform="scale(-1 1)" />
			</g>
			<g transform="matrix(8.1434 0 0 8.1434 0 58.787)">
				<circle r="1" />
				<g id="g">
					<g id="f">
						<path
							id="e"
							d="M 0.258819045103,0.965925826289 L 0,1.576749285537 L -0.258819045103,0.965925826289"
						/>
						<use xlinkHref="#e" transform="rotate(180)" />
					</g>
					<use xlinkHref="#f" transform="rotate(90)" />
				</g>
				<use xlinkHref="#g" transform="rotate(30)" />
				<use xlinkHref="#g" transform="rotate(60)" />
			</g>
		</g>
	</svg>
);

export const AmericanFlag = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		width="24"
		height="16"
		viewBox="0 0 7410 3900"
	>
		<rect width="7410" height="3900" fill="#b22234" />
		<path
			d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0"
			stroke="#fff"
			strokeWidth="300"
		/>
		<rect width="2964" height="2100" fill="#3c3b6e" />
		<g fill="#fff">
			<g id="s18">
				<g id="s9">
					<g id="s5">
						<g id="s4">
							<path
								id="s"
								d="M247,90 317.534230,307.082039 132.873218,172.917961H361.126782L176.465770,307.082039z"
							/>
							<use xlinkHref="#s" y="420" />
							<use xlinkHref="#s" y="840" />
							<use xlinkHref="#s" y="1260" />
						</g>
						<use xlinkHref="#s" y="1680" />
					</g>
					<use xlinkHref="#s4" x="247" y="210" />
				</g>
				<use xlinkHref="#s9" x="494" />
			</g>
			<use xlinkHref="#s18" x="988" />
			<use xlinkHref="#s9" x="1976" />
			<use xlinkHref="#s5" x="2470" />
		</g>
	</svg>
);
