import { Button, Heading, VStack } from "@chakra-ui/react";
import Link from "next/link";

const PageNotFound = () => (
	<VStack h="100vh" w="full" justifyContent="center" alignItems="center">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			data-name="Layer 1"
			viewBox="0 0 2000 2000"
			width="550"
			height="550"
		>
			<polygon
				fill="#ffeadc"
				points="1429.79 347.15 420 493.7 177.45 1080.12 616.68 1689.45 1645.95 1584.23 1817.55 925.8 1429.79 347.15"
				className="colorffeadc svgShape"
			/>
			<path
				fill="#fd8571"
				d="M814.77,752.93s61.25,66.23,80.56,92S881,901.16,850,878.56s-78.84-74.64-78.84-74.64Z"
				className="colorfd8571 svgShape"
			/>
			<path
				fill="#fd8571"
				d="M758.86,793.44s65.36,57.77,86.23,81.42-10,58.16-42,38.51-82.83-66.73-82.83-66.73Z"
				className="colorfd8571 svgShape"
			/>
			<path
				fill="#fd8571"
				d="M720.55,832.28s61.3,56.49,81,78.79-9.06,52.86-39.29,34.33-78.12-62.94-78.12-62.94Z"
				className="colorfd8571 svgShape"
			/>
			<path
				fill="#f76e5c"
				d="M574.73,783.55s91.65-68.89,127.65-91.17,83.12,7.75,52.66,41.35-102.5,87.44-102.5,87.44Z"
				className="colorf76e5c svgShape"
			/>
			<path
				fill="#0061fa"
				d="M523.86,1442.66l-31.68-4.57,2.29-15.84c10-69.53,32.6-153.29,67-249,29.67-82.42,68.32-173.57,111.78-263.6,79.91-165.58,168-310.8,214.09-353.16l11.8-10.82,21.64,23.58L909,580.1c-42.8,39.28-129.82,183.74-206.92,343.49-43,89-81.18,179.14-110.48,260.53-33.72,93.65-55.75,175.31-65.49,242.7Z"
				className="color0061fa svgShape"
			/>
			<path
				fill="none"
				stroke="#000"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="9"
				d="M836.84 865.77c-10.51-10.51-56.5-54.14-65.7-64.13M797.68 907.24c-10.51-10.52-56.51-54.14-65.7-64.13"
				className="colorStroke000 svgStroke"
			/>
			<path
				fill="#fd8571"
				d="M864.8,664.72c-.67-.49-1.36-1-2-1.46-.92-11.65-6.09-20.74-16.72-26.75-11.23-6.34-23.35-4.59-35.5,2q-5.29-1.54-10.62-2.83c-20.27,13.83-53.15,42.82-64,71.06h0c3.72.05,7.53.23,11.41.53-2.34,3.56-4.58,7-6.69,10.4-.41.66-.83,1.32-1.27,2,13.62,13.85,57.69,22.55,94.4,27.55q4.79-8.76,9-17C866.71,738.27,934.3,715.8,864.8,664.72Z"
				className="colorfd8571 svgShape"
			/>
			<path
				fill="#feb0a3"
				d="M894.42 698.9a35.94 35.94 0 01.18 5.09 23.93 23.93 0 01-4 12.29c-.84 1.32-2.28 3-3.31 4.7C893.64 715.6 897 708.23 894.42 698.9zM634.48 784s12.62 13.66 21 15.24 61.88-44.42 85.15-81.47c25.76-41 70-101.18 105.39-81.21 33.18 18.75 13.27 67.54-23.52 130.62s-79.76 168.19-116 222.33-116.69 110.9-136.66 138.76-195.78 280.13-195.78 280.13-32.86-69.36-66-98.27-125.63-61.49-125.63-61.49 125.1-147.7 158.21-198.16 92-133.5 102.5-187.12 18.39-143.49 44.67-168.72 137.71-51.7 170.3-58.43c23.93-4.95 86.1-12.27 145.86.58 51.85 11.15-7.81 72-61.51 70.26-15.21-.49-29.34.43-39.67 4.94-37.32 16.29-58.87 20-58.87 20z"
				className="colorfeb0a3 svgShape"
			/>
			<path
				fill="#fd8571"
				d="M834.94 632.81l.55.06zM839.51 633.74l.49.16zM837.27 633.19l.23 0zM832.87 632.62l.51 0zM810.54 638.56c-3.53-1-49 26.33-74.61 68.23 3.72.05 7.53.23 11.41.53C764.52 681.21 787.57 651.12 810.54 638.56zM739.38 719.7h0c.42-.63.82-1.26 1.22-1.89C740.2 718.44 739.8 719.07 739.38 719.7zM744 712.51l-.12.2zM847.8 637.57l.49.32zM849.49 638.71l.5.37zM851.21 640l.31.24zM853.15 641.74a1.7 1.7 0 00-.19-.19A1.7 1.7 0 01853.15 641.74zM841.49 634.4l.64.25zM831 632.57h0zM828.49 632.68l.19 0zM843.52 635.25l.59.26zM855.84 644.65l-.24-.29zM858.11 647.89l-.1-.17zM840.72 734.19c-.08.14-.15.29-.23.44C840.57 734.48 840.64 734.33 840.72 734.19zM854.61 643.23c-.1-.12-.2-.23-.31-.34C854.41 643 854.51 643.11 854.61 643.23zM861.79 657v0zM859.06 649.6l-.12-.24zM861.27 655.06l0-.08zM826.18 633l.39-.06zM817.27 635.4l.19-.07zM819.59 634.56l.06 0zM824.06 633.34l.26-.05zM833.78 747.25zM836.28 742.64l-.28.51zM864.8 664.72c-.67-.49-1.36-1-2-1.46 1.37 17.26-6.59 40.13-20 67h0C866.71 738.27 934.3 715.8 864.8 664.72z"
				className="colorfd8571 svgShape"
			/>
			<path
				d="M899.1 851.48a30.12 30.12 0 00-3.77-6.56c-5.36-7.15-14-17.42-23.58-28.53l-6.21 6.77a2.67 2.67 0 000 3.58l25.18 27.83a2.67 2.67 0 003.51.38zM849.2 660.69a96.94 96.94 0 00-13.89-9c-5.55-2.72-14.38-6-14.38-6-3.44-1-6.08-.39-7.51 2.32l-14.11 26.71a5.56 5.56 0 002.32 7.51s10.71 4.61 14.6 7c3.38 2 13.67 8 13.67 8a5.55 5.55 0 007.51-2.32l14.11-26.71C853 665.49 851.79 662.73 849.2 660.69z"
				fill="#000000"
				className="color000 svgShape"
			/>
			<path
				fill="#fd8571"
				d="M374.05,1408.35s-66.9-7.95-119.59-52.21-71.21-108.07-71.21-108.07,67.41,5.47,120.09,49.73S374.05,1408.35,374.05,1408.35Z"
				className="colorfd8571 svgShape"
			/>
			<path
				d="M899.2,545.7s9.25.76,15.28,7.2,6.34,16.38,6.34,16.38-9.68-1.35-15.7-7.79S899.2,545.7,899.2,545.7Z"
				fill="#000000"
				className="color000 svgShape"
			/>
			<path
				fill="#0061fa"
				d="M492.18,1438.07s7.64-5.27,16.38-4.1,15.29,8.66,15.29,8.66-8.35,5.08-17.09,3.92S492.18,1438.07,492.18,1438.07Z"
				className="color0061fa svgShape"
			/>
			<path
				fill="#0061fa"
				stroke="#0061fa"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="4"
				d="M905.11 550.85s8.56-11.24 15.71-15.57M910.64 556.67s8.56-11.24 15.71-15.57M915.92 563.16s8.56-11.23 15.71-15.57"
				className="color0061fa svgShape colorStroke0061fa svgStroke"
			/>
			<path
				fill="#fd8571"
				d="M1190.23,752.93s-61.25,66.23-80.56,92S1124,901.16,1155,878.56s78.84-74.64,78.84-74.64Z"
				className="colorfd8571 svgShape"
			/>
			<path
				fill="#fd8571"
				d="M1246.14,793.44s-65.36,57.77-86.23,81.42,10,58.16,42,38.51,82.83-66.73,82.83-66.73Z"
				className="colorfd8571 svgShape"
			/>
			<path
				fill="#fd8571"
				d="M1284.45,832.28s-61.3,56.49-81,78.79,9.06,52.86,39.29,34.33,78.12-62.94,78.12-62.94Z"
				className="colorfd8571 svgShape"
			/>
			<path
				fill="#f76e5c"
				d="M1394.32,767.14s-80.12-82-110.55-107.25-57.3,27.59-28.32,70.37S1347.33,837,1347.33,837Z"
				className="colorf76e5c svgShape"
			/>
			<path
				fill="#0061fa"
				d="M1481.14,1442.66l31.68-4.57-2.29-15.84c-10-69.53-32.6-153.29-67-249-29.67-82.42-68.32-173.57-111.78-263.6-79.91-165.58-168-310.8-214.09-353.16l-11.8-10.82-21.64,23.58L1096,580.1c42.8,39.28,129.82,183.74,206.92,343.49,43,89,81.18,179.14,110.48,260.53,33.72,93.65,55.75,175.31,65.49,242.7Z"
				className="color0061fa svgShape"
			/>
			<path
				fill="none"
				stroke="#000"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="9"
				d="M1168.16 865.77c10.51-10.51 56.5-54.14 65.7-64.13M1207.32 907.24c10.51-10.52 56.51-54.14 65.7-64.13"
				className="colorStroke000 svgStroke"
			/>
			<path
				fill="#fd8571"
				d="M1140.2,664.72c.67-.49,1.36-1,2-1.46.92-11.65,6.09-20.74,16.72-26.75,11.23-6.34,23.35-4.59,35.5,2q5.3-1.54,10.62-2.83c20.27,13.83,53.15,42.82,64,71.06h0c-3.72.05-7.53.23-11.41.53,2.34,3.56,4.58,7,6.69,10.4.41.66.83,1.32,1.27,2-13.62,13.85-57.69,22.55-94.4,27.55q-4.79-8.76-9-17C1138.29,738.27,1070.7,715.8,1140.2,664.72Z"
				className="colorfd8571 svgShape"
			/>
			<path
				fill="#feb0a3"
				d="M1110.58 698.9a35.94 35.94 0 00-.18 5.09 23.93 23.93 0 003.95 12.29c.84 1.32 2.28 3 3.31 4.7C1111.36 715.6 1108 708.23 1110.58 698.9zM1370.52 784s-12.62 13.66-21 15.24-61.88-44.42-85.15-81.47c-25.76-41-70-101.18-105.39-81.21-33.18 18.75-13.27 67.54 23.52 130.62s79.76 168.19 116 222.33 116.69 110.9 136.66 138.76S1631 1408.35 1631 1408.35s32.86-69.36 66-98.27 125.63-61.49 125.63-61.49-125.1-147.7-158.21-198.16-92-133.5-102.5-187.12-18.39-143.49-44.67-168.72-137.71-51.7-170.3-58.43c-23.93-4.95-86.1-12.27-145.86.58-51.85 11.15 7.81 72 61.51 70.26 15.21-.49 29.34.43 39.67 4.94 37.32 16.29 58.87 20 58.87 20z"
				className="colorfeb0a3 svgShape"
			/>
			<path
				fill="#fd8571"
				d="M1170.06 632.81l-.55.06zM1165.49 633.74l-.49.16zM1167.73 633.19l-.23 0zM1172.13 632.62l-.51 0zM1194.46 638.56c3.53-1 49 26.33 74.61 68.23-3.72.05-7.53.23-11.41.53C1240.48 681.21 1217.43 651.12 1194.46 638.56zM1265.62 719.7h0c-.42-.63-.82-1.26-1.22-1.89C1264.8 718.44 1265.2 719.07 1265.62 719.7zM1261 712.51l.12.2zM1157.2 637.57l-.49.32zM1155.51 638.71l-.5.37zM1153.79 640l-.31.24zM1151.85 641.74l.19-.19zM1163.51 634.4l-.64.25zM1174 632.57h0zM1176.51 632.68l-.19 0zM1161.48 635.25l-.59.26zM1149.16 644.65l.24-.29zM1146.89 647.89l.1-.17zM1164.28 734.19c.08.14.15.29.23.44C1164.43 734.48 1164.36 734.33 1164.28 734.19zM1150.39 643.23c.1-.12.2-.23.31-.34C1150.59 643 1150.49 643.11 1150.39 643.23zM1143.21 657v0zM1145.94 649.6l.12-.24zM1143.73 655.06l0-.08zM1178.82 633l-.39-.06zM1187.73 635.4l-.19-.07zM1185.41 634.56l-.06 0zM1180.94 633.34l-.26-.05zM1171.22 747.25zM1168.72 742.64l.28.51zM1140.2 664.72c.67-.49 1.36-1 2-1.46-1.37 17.26 6.59 40.13 20 67h0C1138.29 738.27 1070.7 715.8 1140.2 664.72z"
				className="colorfd8571 svgShape"
			/>
			<path
				d="M1105.9 851.48a30.12 30.12 0 013.77-6.56c5.36-7.15 14-17.42 23.58-28.53l6.21 6.77a2.67 2.67 0 010 3.58l-25.18 27.83a2.67 2.67 0 01-3.51.38zM1155.8 660.69a96.94 96.94 0 0113.89-9c5.55-2.72 14.38-6 14.38-6 3.44-1 6.08-.39 7.51 2.32l14.11 26.71a5.56 5.56 0 01-2.32 7.51s-10.71 4.61-14.6 7c-3.38 2-13.67 8-13.67 8a5.55 5.55 0 01-7.51-2.32l-14.11-26.71C1152.05 665.49 1153.21 662.73 1155.8 660.69z"
				fill="#000000"
				className="color000 svgShape"
			/>
			<path
				fill="#fd8571"
				d="M1631,1408.35s66.9-7.95,119.59-52.21,71.21-108.07,71.21-108.07-67.41,5.47-120.09,49.73S1631,1408.35,1631,1408.35Z"
				className="colorfd8571 svgShape"
			/>
			<path
				d="M1105.8,545.7s-9.25.76-15.28,7.2-6.34,16.38-6.34,16.38,9.68-1.35,15.7-7.79S1105.8,545.7,1105.8,545.7Z"
				fill="#000000"
				className="color000 svgShape"
			/>
			<path
				fill="#0061fa"
				d="M1512.82,1438.07s-7.64-5.27-16.38-4.1-15.29,8.66-15.29,8.66,8.35,5.08,17.09,3.92S1512.82,1438.07,1512.82,1438.07Z"
				className="color0061fa svgShape"
			/>
			<path
				fill="#0061fa"
				stroke="#0061fa"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="4"
				d="M1099.89 550.85s-8.56-11.24-15.71-15.57M1094.36 556.67s-8.56-11.24-15.71-15.57M1089.08 563.16s-8.56-11.23-15.71-15.57"
				className="color0061fa svgShape colorStroke0061fa svgStroke"
			/>
			<path
				fill="none"
				stroke="#000"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="9"
				d="M985.82 464l20.54-140.56M1041.87 472.75l67.62-77.49M942.14 476.82l-75.58-81.56M974.7 568.31l-24.54 68.24M1016 569.93l31.24 74.16"
				className="colorStroke000 svgStroke"
			/>
			<rect
				width="381.64"
				height="34.46"
				x="218.36"
				y="594.52"
				stroke="#000"
				strokeMiterlimit="10"
				strokeWidth="5"
				rx="17.23"
				className="colorStroke000 svgStroke"
			/>
			<rect
				width="339.84"
				height="34.46"
				x="1412.3"
				y="1497.27"
				stroke="#000"
				strokeMiterlimit="10"
				strokeWidth="5"
				rx="17.23"
				className="colorStroke000 svgStroke"
			/>
			<circle
				cx="786.07"
				cy="1451.28"
				r="42.93"
				stroke="#000"
				strokeMiterlimit="10"
				strokeWidth="5"
				className="colorStroke000 svgStroke"
			/>
			<path
				fill="none"
				stroke="#000"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="9"
				d="M1615.12 521.8s-7.69-86.14-61.14-86.14c-49.92 0-63 86.14-42 86.14s14.58-49.47-15.9-49.47-34 49.47-34 49.47H1245.49M276 1620.46s8-83.93 59.19-83.93 81.28 83.93 37.11 83.93-28.71-86.14 24.74-86.14c49.92 0 62.94 86.14 42 86.14S424.45 1571 454.93 1571s34 49.48 34 49.48h216.6"
				className="colorStroke000 svgStroke"
			/>
			<circle
				cx="1238.36"
				cy="1218.9"
				r="16.86"
				stroke="#000"
				strokeMiterlimit="10"
				strokeWidth="5"
				className="colorStroke000 svgStroke"
			/>
			<circle
				cx="1681.39"
				cy="1612.95"
				r="6.57"
				stroke="#000"
				strokeMiterlimit="10"
				strokeWidth="5"
				className="colorStroke000 svgStroke"
			/>
			<circle
				cx="931.63"
				cy="1037.68"
				r="6.57"
				stroke="#000"
				strokeMiterlimit="10"
				strokeWidth="5"
				className="colorStroke000 svgStroke"
			/>
			<circle
				cx="1726.35"
				cy="814.73"
				r="24.53"
				stroke="#000"
				strokeMiterlimit="10"
				strokeWidth="5"
				className="colorStroke000 svgStroke"
			/>
			<circle
				cx="470.83"
				cy="478.73"
				r="19.95"
				stroke="#000"
				strokeMiterlimit="10"
				strokeWidth="5"
				className="colorStroke000 svgStroke"
			/>
		</svg>

		<Heading>We&apos;ll let you soon as soon as it&apos;s back</Heading>
		<Button as={Link} href="/" passHref>
			Go Home
		</Button>
	</VStack>
);

export default PageNotFound;
