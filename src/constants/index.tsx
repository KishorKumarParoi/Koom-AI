import { Bell, CreditCard, Home, Library, Settings } from "lucide-react";

export const MENU_ITEMS = (
  workSpaceId: string
): { title: string; href: string; icon: React.ReactNode }[] => [
  {
    title: "Home",
    href: `/dashboard/${workSpaceId}/home`,
    icon: <Home />,
  },
  {
    title: "My Library",
    href: `/dashboard/${workSpaceId}`,
    icon: <Library />,
  },
  {
    title: "Notifications",
    href: `/dashboard/${workSpaceId}/notifications`,
    icon: <Bell />,
  },
  {
    title: "Billing",
    href: `/dashboard/${workSpaceId}/billing`,
    icon: <CreditCard />,
  },
  {
    title: "Settings",
    href: `/dashboard/${workSpaceId}/settings`,
    icon: <Settings />,
  },
];
