import type { ChangeEvent } from "react";

export interface InputProps {
    label: string;
    type: string;
    name: string;
    id: string;
    placeholder: string;
    required: boolean;
    value: string;
    error: boolean;
    errorMessage: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function InputComponent({ inputdata }: { inputdata: InputProps }) {
  const inputClassName = inputdata.error
    ? "block w-full rounded-lg border border-red-500 bg-red-50 p-2.5 text-sm text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500"
    : "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500";

  return (
    <div data-lpignore="true" data-form-type="other">
      <label htmlFor={inputdata.id} className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        {inputdata.label}
      </label>
      <input
        type={inputdata.type}
        name={inputdata.name}
        id={inputdata.id}
        className={inputClassName}
        placeholder={inputdata.placeholder}
        required={inputdata.required}
        value={inputdata.value}
        autoComplete="off"
        data-lpignore="true"
        data-form-type="other"
        onChange={inputdata.onChange}
      />
      {inputdata.error && inputdata.errorMessage ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{inputdata.errorMessage}</p>
      ) : null}
    </div>
  )
}

export default InputComponent
