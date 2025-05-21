import { useSearch } from "@/hooks/useSearch";

type Props = {
  workSpaceId: string;
};
const Search = ({ workSpaceId }: Props) => {
  const { query, onSearchQuery, onUsers, isFetching } = useSearch(
    "get-users",
    "USERS"
  );

  console.log("WorkSpaceId: ", workSpaceId);
  console.log("Query: ", query);
  console.log("onSearchQuery: ", onSearchQuery);
  console.log("On Users: ", onUsers);
  console.log("Is Fetching: ", isFetching);

  // const {} = useMutationData

  return <div>Search</div>;
};

export default Search;
