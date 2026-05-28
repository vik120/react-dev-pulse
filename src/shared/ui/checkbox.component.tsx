import type { ChangeEvent, ReactNode } from 'react'

export interface CheckboxProps{
    label: ReactNode,
    name: string,
    id: string,
    required?: boolean,
    error?: boolean,
    errorMessage?: string,
    checked: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

function CheckboxComponent({ checkboxData }: { checkboxData: CheckboxProps }) {
    
    return (
        <div>
            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input id={checkboxData.id} name={checkboxData.name} aria-describedby={checkboxData.id} type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required={checkboxData.required} data-lpignore="true" data-form-type="other" checked={checkboxData.checked} onChange={checkboxData.onChange} />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor={checkboxData.id} className="text-gray-500 dark:text-gray-300">
                        {checkboxData.label}
                    </label>
                </div>
            </div>
            {checkboxData.error && checkboxData.errorMessage ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{checkboxData.errorMessage}</p>
            ) : null}
        </div>
    )
}

export default CheckboxComponent
