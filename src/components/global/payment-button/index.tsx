import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/useSubscription";
import Loader from "../loader";

const PaymentButton = () => {
  const { onSubscribe, isProcessing } = useSubscription();

  return (
    <div>
      <Button
        variant={"default"}
        className="text-sm flex items-center justify-center mx-auto cursor-pointer w-2/3"
        onClick={onSubscribe}
      >
        <Loader state={isProcessing} color="#000">
          Upgrade
        </Loader>
      </Button>
    </div>
  );
};

export default PaymentButton;
