import React, { ChangeEvent } from 'react'

export interface selectProps{
    label: string; 
    name: string;
    id: string; 
    required: boolean; 
    error: boolean;
    errorMessage: string;
    showBlank: boolean;
    dropdownOptions: {value: string, label: string}[];
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    value: string;
}

function SelectCompoent({selectData}: {selectData: selectProps}) {
    const inputClassName = selectData.error
    ? "block w-full rounded-lg border border-red-500 bg-red-50 p-2.5 text-sm text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500"
    : "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500";

  return (
    <div>
        <label htmlFor={selectData.id} className="block mb-2.5 text-sm font-medium text-heading">{selectData.label}</label>
        <select name={selectData.name} id={selectData.id} className={inputClassName} onChange={selectData.onChange} required={selectData.required} value={selectData.value}>
            {selectData.showBlank && <option>Choose a {selectData.label}</option>}
            {selectData.dropdownOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
  )
}

export default SelectCompoent