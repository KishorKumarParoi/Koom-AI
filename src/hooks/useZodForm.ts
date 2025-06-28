import { zodResolver } from "@hookform/resolvers/zod";
import { UseMutateFunction } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const useZodForm = (
  schema: z.ZodTypeAny,
  mutation: UseMutateFunction,
  defaultValues?: any
) => {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { ...defaultValues },
  });

  const onFormSubmit = handleSubmit(async (values) => mutation({ ...values }));
  return {
    register,
    watch,
    reset,
    onFormSubmit,
    errors,
  };
};

export default useZodForm;
