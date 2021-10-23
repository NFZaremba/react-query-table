import {
  Controller,
  FormProvider,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";
import classnames from "classnames";
import { IComponentBase } from "../../types";
import { FormEventHandler } from "react";

export type IForm<TFormValues> = {
  methods: UseFormReturn<TFormValues>;
  onSubmit?: FormEventHandler<HTMLFormElement>;
} & IComponentBase;

export type IInput = {
  label: string;
  placeholder?: string;
  helperText?: string;
  id: string;
  type?: string;
  readOnly?: boolean;
  required?: boolean;
};

export type IRadioGroup = {
  name: string;
  options: {
    value: string;
    label: string;
  }[];
};

const Asterisk = () => (
  <>
    <i className="text-red-500" aria-hidden="true">
      *
    </i>
    <span className="sr-only">Required</span>
  </>
);

const Form = <TFormValues extends Record<string, any>>({
  children,
  methods,
  onSubmit,
  ...restProps
}: IForm<TFormValues>) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} {...restProps}>
        {children}
      </form>
    </FormProvider>
  );
};

const Input = ({
  label,
  placeholder = "",
  helperText = "",
  id,
  type = "text",
  readOnly = false,
  required,
  ...restProps
}: IInput) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-4">
      <label htmlFor={id} className="mb-2">
        {label}
        {required && <Asterisk />}
      </label>
      <div>
        <input
          {...register(id)}
          name={id}
          id={id}
          readOnly={readOnly}
          type={type}
          placeholder={placeholder}
          aria-describedby={id}
          className={classnames("block w-full rounded-md shadow-sm ", {
            "bg-gray-100 focus:ring-0 cursor-not-allowed border-gray-300 focus:border-gray-300":
              readOnly,
            " focus:ring-red-500 border-red-500 focus:border-red-500":
              errors[id],
            "focus:ring-green-500 focus:border-green-500": !errors[id],
          })}
          {...restProps}
        />
      </div>
      <div className="mt-1">
        {helperText !== "" && (
          <p className="text-xs text-gray-500">{helperText}</p>
        )}
        {errors[id] && (
          <span className="text-sm text-red-500">{errors[id].message}</span>
        )}
      </div>
    </div>
  );
};

const RadioGroup = ({ name, options }: IRadioGroup) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-4">
      <Controller
        rules={{ required: true }}
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className="flex flex-row ">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex flex-row justify-center items-center mr-4"
              >
                <label className="mr-2" htmlFor={option.value}>
                  {option.label}
                </label>
                <input
                  className="text-green-500 focus:outline-none focus-visible:ring-2 focus:ring-green-500"
                  type="radio"
                  value={option.value}
                  onChange={onChange}
                  checked={option.value === value}
                />
              </div>
            ))}
            <Asterisk />
          </div>
        )}
      />
      {errors[name] && (
        <span className="text-sm text-red-500">{errors[name].message}</span>
      )}
    </div>
  );
};

Form.Input = Input;
Form.RadioGroup = RadioGroup;

export default Form;
