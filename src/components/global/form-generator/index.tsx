import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
type Props = {
  type?: "text" | "email" | "password" | "number";
  inputType: "select" | "input" | "textarea";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  register: UseFormRegister<any>;
  name: string;
  errors: FieldErrors<FieldValues>;
  lines?: number;
};

export const FormGenerator = (props: Props) => {
  const {
    inputType,
    type,
    options,
    label,
    placeholder,
    name,
    register,
    errors,
    lines,
  } = props;
  switch (inputType) {
    case "input":
      return (
        <Label
          className="flex flex-col gap-2 text-[#9D9D9D]"
          htmlFor={`input-${label}`}
        >
          {label && label}
          <Input
            id={`input-${label}`}
            type={type}
            placeholder={placeholder}
            className="bg-transparent border-slate-700 text-white"
            {...register(name)}
          />

          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );

    case "select":
      return (
        <Label
          className="flex flex-col gap-2 text-[#9D9D9D]"
          htmlFor={`select-${label}`}
        >
          {label && label}
          <select
            id={`select-${label}`}
            className="w-full bg-transparent border-[1px] p-3 rounded-lg"
            {...register(name)}
          >
            {options?.length &&
              options?.map((option) => (
                <option
                  value={option.value}
                  key={option.id}
                  className="dark:bg-neutral-400"
                >
                  {option.label}
                </option>
              ))}
          </select>

          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );

    case "textarea":
      return (
        <Label
          className="flex flex-col gap-2 text-[#9D9D9D]"
          htmlFor={`textarea-${label}`}
        >
          {label && label}
          <textarea
            className="bg-transparent border-slate-700 text-slate-900 "
            id={`textarea-${label}`}
            placeholder={placeholder}
            rows={lines}
            {...register(name)}
          />

          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );

    default:
      break;
  }
  return <div>FormGenerator</div>;
};
