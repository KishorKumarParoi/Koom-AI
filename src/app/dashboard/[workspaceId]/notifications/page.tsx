"use client";

import { getUserNotifications } from "@/actions/user";
import Loader from "@/components/global/loader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useQueryData from "@/hooks/useQueryData";
import { UserButton } from "@clerk/nextjs";

type Props = {};

const Notifications = (props: Props) => {
  const { data: notifications, isPending } = useQueryData(
    ["user-notifications"],
    getUserNotifications
  );

  const { data: notification, status } = notifications as {
    status: number;
    data: {
      notification: {
        id: string;
        userId: string | null;
        content: string;
      }[];
    };
  };

  if (isPending) {
    return (
      <div className="flex flex-col">
        <Loader state={isPending} color="#000">
          Loading...
        </Loader>
      </div>
    );
  }

  if (status !== 200) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <p>No Notification</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {notification.notification.map((n) => (
        <div
          key={n.id}
          className="border-2 flex gap-x-3 items-center rounded-lg p-3"
        >
          <Avatar>
            <AvatarFallback>
              <UserButton />
            </AvatarFallback>
          </Avatar>
          <p>{n.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
