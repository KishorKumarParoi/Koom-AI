import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Monitor, Moon, Sun } from "lucide-react";

type SystemModeProps = {
  loading?: boolean;
};

export const SystemMode = ({ loading }: SystemModeProps) => (
  <div className="flex flex-col items-center gap-2 p-4">
    {loading ? (
      <Skeleton className="w-12 h-12 rounded-full" />
    ) : (
      <Avatar className="w-12 h-12 bg-[#18181b] border border-[#232323]">
        <AvatarFallback>
          <Monitor className="w-6 h-6 text-blue-400" />
        </AvatarFallback>
      </Avatar>
    )}
    <span className="text-xs text-[#bdbdbd] font-medium">System</span>
  </div>
);

type LightModeProps = {
  loading?: boolean;
};

export const LightMode = ({ loading }: LightModeProps) => (
  <div className="flex flex-col items-center gap-2 p-4">
    {loading ? (
      <Skeleton className="w-12 h-12 rounded-full" />
    ) : (
      <Avatar className="w-12 h-12 bg-[#18181b] border border-[#232323]">
        <AvatarFallback>
          <Sun className="w-6 h-6 text-blue-400" />
        </AvatarFallback>
      </Avatar>
    )}
    <span className="text-xs text-[#bdbdbd] font-medium">Light</span>
  </div>
);

type DarkModeProps = {
  loading?: boolean;
};

export const DarkMode = ({ loading }: DarkModeProps) => (
  <div className="flex flex-col items-center gap-2 p-4">
    {loading ? (
      <Skeleton className="w-12 h-12 rounded-full" />
    ) : (
      <Avatar className="w-12 h-12 bg-[#18181b] border border-[#232323]">
        <AvatarFallback>
          <Moon className="w-6 h-6 text-blue-400" />
        </AvatarFallback>
      </Avatar>
    )}
    <span className="text-xs text-[#bdbdbd] font-medium">Dark</span>
  </div>
);
