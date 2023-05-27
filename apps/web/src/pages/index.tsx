import Navbar from "@/components/ui/navbar";
import {
	Box,
	Button,
	Heading,
	Img,
	Stack,
	Text,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import { HiPlay } from "react-icons/hi";

const HomePage = () => (
	<Box>
		<Navbar />
		<Box as="section">
			<Box
				maxW={{ base: "xl", md: "7xl" }}
				mx="auto"
				px={{ base: "6", md: "8" }}
			>
				<Stack
					direction={{ base: "column", lg: "row" }}
					spacing={{ base: "3rem", lg: "2rem" }}
					mt="8"
					align={{ lg: "center" }}
					justify="space-between"
				>
					<Box flex="1" maxW={{ lg: "520px" }}>
						<Text
							size="xs"
							textTransform="uppercase"
							fontWeight="semibold"
							color={mode("blue.600", "blue.300")}
							letterSpacing="wide"
						>
							Hire Talents
						</Text>
						<Heading
							as="h1"
							size="3xl"
							color={mode("blue.600", "blue.300")}
							mt="8"
							fontWeight="extrabold"
							letterSpacing="tight"
						>
							Get world class talents for your project
						</Heading>
						<Text
							color={mode("gray.600", "gray.400")}
							mt="4"
							fontSize="lg"
							fontWeight="medium"
						>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</Text>
						<Stack direction={{ base: "column", md: "row" }} spacing="4" mt="8">
							<Button
								size="lg"
								minW="210px"
								colorScheme="blue"
								height="14"
								px="8"
							>
								Get Started
							</Button>
							<Button
								size="lg"
								bg="white"
								color="gray.900"
								_hover={{ bg: "gray.50" }}
								height="14"
								px="8"
								shadow="base"
								leftIcon={<Box as={HiPlay} fontSize="2xl" />}
							>
								Watch Demo
							</Button>
						</Stack>
						<Text mt="8" color={mode("gray.600", "gray.400")}>
							Already have an account store?{" "}
						</Text>
					</Box>
					<Box
						pos="relative"
						w={{ base: "full", lg: "700px" }}
						h={{ base: "auto", lg: "560px" }}
					>
						<Img
							w="full"
							pos="relative"
							zIndex="1"
							h={{ lg: "100%" }}
							objectFit="cover"
							src="https://img.freepik.com/free-vector/hand-drawn-transport-truck-with-location_23-2149153179.jpg?w=996&t=st=1685031782~exp=1685032382~hmac=1897955ee09207352a5fd6d0bea72dc5a5077b5e015031c01a5fcf8a053d0620"
							alt="Screening talent"
						/>
					</Box>
				</Stack>
			</Box>
		</Box>
	</Box>
);

export default HomePage;
