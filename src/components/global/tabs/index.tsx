import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";

type Props = {
  triggers: string[];
  children: React.ReactNode;
  defaultValue: string;
};

const TabMenu = ({ children, defaultValue, triggers }: Props) => {
  return (
    <Tabs className="w-full" defaultValue={defaultValue}>
      <TabsList className="flex justify-start bg-transparent">
        {triggers.map((trigger) => (
          <TabsTrigger
            key={trigger}
            value={trigger}
            className="capitalize cursor-pointer text-base data-[state=active]:bg-[#1D1D1D]"
          >
            {trigger}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
};

export default TabMenu;
