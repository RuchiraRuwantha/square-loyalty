import React from 'react';
import Loader from './Loader';

type ButtonProps = {
    children: React.ReactNode;
    onClick?: (event: React.FormEvent) => void;
    loading?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, loading = false, disabled = false, type = 'button', className }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`inline-flex items-center justify-center px-4 py-2 bg-blue-800 text-white rounded-md 
        hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition ${className ?? ''}`}
        >
            {loading ? <Loader size={20} /> : children}
        </button>
    );
}