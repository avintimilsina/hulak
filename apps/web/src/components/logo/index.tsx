import { Link } from "@chakra-ui/next-js";
import { chakra, HTMLChakraProps } from "@chakra-ui/react";

interface LogoProps extends HTMLChakraProps<"svg"> {
	primary?: string;
	secondary?: string;
}
const Logo = ({ primary, secondary, ...rest }: LogoProps) => (
	<Link href="/">
		<chakra.svg
			height="10"
			viewBox="0 0 330 60"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...rest}
		>
			<path
				d="M92 29L75.7583 0.45399C75.6014 0.178178 75.0154 0.316957 75 0H84.1987L100 27.5L101.5 29.5L85 59.5H75.4668H75C75.2583 59.371 75.4135 59.3565 75.6865 59.1188L91.9151 30.9574C92.2605 30.358 92.2926 29.6268 92 29Z"
				fill="white"
			/>
			<path
				d="M84 0.00999451C85.32 0.00999451 86.46 0.00999451 87.6 0.00999451C95.77 0.00999451 103.93 0.01 112.1 0C112.7 0 113.05 0.209996 113.35 0.729996C116.19 5.77 119.05 10.8 121.91 15.83C124.3 20.04 126.67 24.26 129.12 28.43C129.79 29.57 129.55 30.41 128.94 31.44C127.1 34.55 125.33 37.71 123.55 40.85C120.92 45.47 118.3 50.09 115.68 54.71C114.88 56.12 114.12 57.56 113.28 58.94C113.12 59.21 112.65 59.45 112.32 59.45C104.65 59.48 96.98 59.47 89.32 59.47C87.71 59.47 86.09 59.47 84.29 59.47C84.93 58.28 85.49 57.21 86.09 56.17C87.28 54.1 88.53 52.05 89.71 49.97C91.96 46.01 94.18 42.02 96.43 38.05C97.74 35.73 99.06 33.42 100.41 31.12C100.86 30.35 100.97 29.67 100.46 28.84C99.31 26.97 98.24 25.05 97.15 23.15C95.02 19.4 92.9 15.64 90.77 11.88C88.86 8.52001 86.95 5.15999 85.03 1.79999C84.73 1.26999 84.42 0.739995 84 0.00999451Z"
				fill={secondary}
			/>
			<path
				d="M100.805 30C100.755 30.3 100.68 30.69 100.5 31C99.0484 33.5 97.71 35.68 96.4 38C94.16 41.97 91.68 45.8 89.42 49.77C88.24 51.85 86.99 53.89 85.8 55.97C85.2 57.01 84.65 58.32 84 59.5C85.81 59.5 87.39 59.5 89 59.5C96.67 59.5 104.84 59.52 112.5 59.5C112.83 59.5 113.33 58.77 113.5 58.5C114.34 57.12 115.2 55.91 116 54.5C118.62 49.88 121.5 44.5 124 40C125.751 36.8482 127 35 129 31.5C129.26 31.07 129.41 30.4 129.5 30H100.805Z"
				fill={primary}
			/>
			<path
				d="M29.03 45.15C29.58 45.15 29.92 45.15 30.26 45.15C41.96 45.15 53.67 45.14 65.37 45.14C67.12 45.14 67.12 45.15 66.25 43.6C65.15 41.64 64.08 39.67 62.93 37.74C62.75 37.44 62.21 37.2 61.83 37.19C60.04 37.13 58.24 37.15 56.45 37.15C47.86 37.16 39.27 37.23 30.67 37.15C26.92 37.11 23.68 35.58 21.2 32.74C18.63 29.8 16.86 26.29 14.71 23.05C14.66 22.97 14.65 22.87 14.54 22.55C15.84 22.55 17.05 22.55 18.25 22.55C32.52 22.55 46.79 22.55 61.06 22.54C61.16 22.54 61.26 22.53 61.36 22.54C62.26 22.66 62.8 22.38 63.27 21.47C64.31 19.4 65.56 17.44 66.72 15.43C67.04 14.88 66.95 14.68 66.3 14.63C65.95 14.61 65.6 14.62 65.25 14.62C49.39 14.62 33.52 14.62 17.66 14.63C15.76 14.63 13.89 14.53 12.09 13.83C9.26 12.72 7.00001 10.88 5.29001 8.41003C3.56001 5.91003 1.97001 3.31003 0.320007 0.750027C0.230007 0.610027 0.16 0.450021 0 0.150021C0.43 0.100021 0.780005 0.0400356 1.13 0.0400356C8.03 0.0300356 14.93 0.0300259 21.83 0.0300259C38.96 0.0300259 56.1 0.0300356 73.23 0.0400356C75.93 0.0400356 75.67 -0.28 77 2C79.57 6.42 81.98 11.06 84.5 15.5C85.68 17.58 86.82 19.42 88 21.5C89.39 23.95 91 26.5 92 29C92.41 29.69 92.39 30.3421 92 31.0221C90.16 34.2221 88.33 37.3121 86.5 40.5221C84.37 44.2421 82.13 47.9 80 51.63C78.67 53.97 77.35 56.32 76.04 58.67C75.72 59.25 75.31 59.49 74.61 59.49C64.67 59.47 54.74 59.44 44.8 59.5C41.87 59.52 39.43 58.45 37.21 56.68C35.69 55.47 34.58 53.91 33.55 52.27C32.28 50.24 30.93 48.26 29.63 46.26C29.47 45.98 29.32 45.67 29.03 45.15Z"
				fill={primary}
			/>
			<path
				d="M154.155 34.81V24.19H163.592V0H174.208V34.81H154.155ZM140 59V0H150.616V59H140ZM163.592 59V38.35H174.208V59H163.592ZM199.823 59V48.38H202.94L204.541 46.7786V0H215.158V51.1614L207.322 59H199.823ZM188.785 59L180.949 51.1614V0H191.566V46.7786L193.167 48.38H196.284V59H188.785ZM221.898 44.84V0H232.514V44.84H221.898ZM221.898 59V48.38H232.514V59H221.898ZM236.053 59V48.38H249.029V59H236.053ZM254.084 59L258.887 35.4H276.918L273.295 17.3629L270.431 31.86H259.561L265.965 0H280.626L289.894 46.02H267.566L264.953 59H254.084ZM281.72 59L279.783 49.56H290.652L292.506 59H281.72ZM311.716 39.7829V22.6728L319.384 12.8957V0H330V16.6043L311.716 39.7829ZM297.561 59V0H308.178V59H297.561ZM319.384 59V39.6143L317.867 37.76L324.608 29.1629L330 35.9058V59H319.384Z"
				fill={primary}
			/>
		</chakra.svg>
	</Link>
);

Logo.defaultProps = {
	// primary: "#F04D24",
	primary: "#FF5D00",
	secondary: "#000",
};

export default Logo;
