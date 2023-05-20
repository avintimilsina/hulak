import { FormControl, FormLabel } from "@chakra-ui/react";
import { AsyncSelect } from "chakra-react-select";
import { collection, query } from "firebase/firestore";
import { useId } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../../../firebase";

const Search = () => {
	const id = useId();
	const [values, , error] = useCollectionData(query(collection(db, "users")), {
		snapshotListenOptions: { includeMetadataChanges: true },
	});
	if (error) {
		return <div>Error: {error.message}</div>;
	}
	return (
		<FormControl p={4}>
			<FormLabel fontSize="2xl" htmlFor="Users">
				Users
			</FormLabel>
			<AsyncSelect
				components={{
					DropdownIndicator: () => null,
					IndicatorSeparator: () => null,
				}}
				instanceId={id}
				name="Users"
				placeholder="🔍 Search Someone"
				closeMenuOnSelect={false}
				size="md"
				loadOptions={(inputValue, callback) => {
					const filteredValues = values
						?.filter((i) =>
							i.displayName.toLowerCase().includes(inputValue.toLowerCase())
						)
						.map((i) => ({
							label: i.displayName as string,
							value: i.uid as string,
						}));
					callback(filteredValues!);
				}}
			/>
		</FormControl>
	);
};

export default Search;
