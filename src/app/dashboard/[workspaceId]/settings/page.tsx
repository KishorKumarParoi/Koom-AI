"use client";

import { enableFirstView, getFirstView } from "@/actions/user";
import { DarkMode, LightMode, SystemMode } from "@/components/global/themes";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Settings = () => {
  const [firstView, setFirstView] = useState<undefined | boolean>(undefined);
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (firstView !== undefined) return;
    const fetchData = async () => {
      const response = await getFirstView();
      if (response.status === 200) setFirstView(response?.data ?? undefined);
    };
    fetchData();
  }, [firstView]);

  if (!mounted) return null;

  const switchState = async (checked: boolean) => {
    const view = await enableFirstView(checked);
    if (view) {
      toast(
        view.status === 200
          ? checked
            ? "First View Enabled"
            : "First View Disabled"
          : "Failed to update First View",
        {
          description: view.data,
        }
      );
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-4 flex lg:flex-row flex-col items-start gap-5">
          <div
            className={cn(
              "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
              theme == "system" && "border-purple-800"
            )}
            onClick={() => setTheme("system")}
          >
            <SystemMode />
          </div>
          <div
            className={cn(
              "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
              theme == "light" && "border-purple-800"
            )}
            onClick={() => setTheme("light")}
          >
            <LightMode />
          </div>
          <div
            className={cn(
              "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
              theme == "dark" && "border-purple-800"
            )}
            onClick={() => setTheme("dark")}
          >
            <DarkMode />
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mt-4">Video Sharing Settings</h2>
        <p className="text-muted-foreground">
          Enabling this feature will send you notifications when someone watched
          your video for this first time. This feature can help during client
          outreach.
        </p>
        <div
          className={cn(
            "flex items-center gap-x-3 mt-4 text-md px-3 py-2 rounded-lg transition-colors",
            firstView
              ? "bg-purple-900/30 text-purple-300 ring-2 ring-purple-700"
              : "bg-transparent text-white"
          )}
        >
          <Label
            htmlFor="first-view-switch"
            className="cursor-pointer select-none"
          >
            Enable First View
          </Label>
          <Switch
            id="first-view-switch"
            onCheckedChange={switchState}
            disabled={firstView === undefined}
            checked={firstView}
            className="data-[state=checked]:bg-purple-700 data-[state=unchecked]:bg-gray-300 border border-gray-500"
            onClick={() => setFirstView(!firstView)}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
