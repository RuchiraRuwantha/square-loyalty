import React from 'react';

type FormWrapperProps = {
    children: React.ReactNode;
    className?: string;
    onSubmit?: (e: React.FormEvent) => void;
}

export const FormWrapper: React.FC<FormWrapperProps> = ({ children, className = '', onSubmit }) => {
    return (
        <form className={`max-w-md mx-auto p-6 bg-white rounded-md ${className}`} onClick={onSubmit}>
            {children}
        </form>
    );
}