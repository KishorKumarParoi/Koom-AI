import { Input } from "@/components/ui/input";
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

  // TODO: Wire Up Sending Invitations
  // const { mutate, isPending } = useMutationData(
  //   ["invite-member"],
  //   (data: { receiverId: string; email: string }) => {

  //   }
  // );

  return (
    <div className="flex flex-col gap-y-5 ">
      <Input
        onChange={onSearchQuery}
        value={query}
        className="bg-transparent border-2 outline-none "
        placeholder="Search for your user..."
        type="text"
      />
    </div>
  );
};

export default Search;
