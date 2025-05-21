import { searchWorkspace } from "@/actions/user";
import { useEffect, useRef, useState } from "react";
import useQueryData from "./useQueryData";

export const useSearch = (key: string, type: "WORKSPACE") => {
  const [query, setQuery] = useState("");
  const [debounce, setDebounce] = useState("");
  const [onUsers, setOnUsers] = useState<
    | {
        id: string;
        subscription: {
          plan: "PRO" | "FREE";
        };
        firstname: string | null;
        lastname: string | null;
        image: string | null;
        email: string | null;
      }[]
    | undefined
  >(undefined);

  const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setDebounce(query);
    }, 1000);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [query]);

  //   useEffect(() => {
  //     const delayInputTimeOutId = setTimeout(() => {
  //       setDebounce(query);
  //     }, 1000);

  //     return () => clearTimeout(delayInputTimeOutId);
  //   }, [query]);

  const { refetch, isFetching } = useQueryData(
    [key, debounce],
    async ({ queryKey }) => {
      if (type === "WORKSPACE") {
        const workspace = await searchWorkspace(queryKey[1] as string);
        if (workspace.status === 200) {
          const filtered = Array.isArray(workspace?.data)
            ? workspace.data
                .filter(
                  (user) =>
                    user.subscription &&
                    (user.subscription.plan === "PRO" ||
                      user.subscription.plan === "FREE")
                )
                .map((user) => ({
                  ...user,
                  // Ensure subscription is not null and plan is "PRO" or "FREE"
                  subscription: {
                    plan: user.subscription!.plan as "PRO" | "FREE",
                  },
                }))
            : undefined;
          setOnUsers(filtered);
        }
      }
    },
    false
  );

  // reftch data

  useEffect(() => {
    if (debounce) {
      refetch();
    }
    if (!debounce) {
      setOnUsers(undefined);
    }
    return () => {
      debounce;
    };
  }, [debounce, refetch]);

  return { onSearchQuery, onUsers, isFetching, query };
};
