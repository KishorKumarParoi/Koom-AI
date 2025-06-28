import {
  Enabled,
  QueryFunction,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";

const useQueryData = (
  queryKey: QueryKey,
  queryFn: QueryFunction,
  enabled?: Enabled
) => {
  const { data, isPending, isFetched, refetch, isFetching } = useQuery({
    queryKey,
    queryFn,
    enabled,
  });
  return { data, isFetched, isPending, refetch, isFetching };
};

export default useQueryData;
