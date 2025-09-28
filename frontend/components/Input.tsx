import React from 'react';
import { ErrorMessage } from './ErrorMessage';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    id?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    placeholder?: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({ label, id, value, onChange, type = 'text', placeholder = '', error = '', ...rest }) => {
    return (
        <div className="flex flex-col mb-4">
            {label && (
                <label htmlFor={id} className="mb-1 text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`border rounded-lg outline-none px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition ${error ? 'border-red-500' : 'border-gray-300'
                    }`}
                {...rest}
            />
            <div className="h-4" data-test="input-error-message">
                {error && <ErrorMessage message={error} /> }
            </div>

        </div>
    );
}

