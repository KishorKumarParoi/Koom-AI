import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  title: string;
  description: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
};

const GlobalCard = ({ title, description, children, footer }: Props) => {
  return (
    <Card className="bg-transparent mt-4">
      <CardHeader className="p-4">
        <CardTitle className="text-md text-[#ebe1e1]">{title}</CardTitle>
        <CardDescription className="text-[#938e8e]">
          {description}
        </CardDescription>
      </CardHeader>
      {children && <div className="pt-4">{children}</div>}
      {footer && <div className="pt-4">{footer}</div>}
    </Card>
  );
};

export default GlobalCard;
