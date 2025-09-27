import React from 'react';

type ErrorMessageProps = {
    message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    if (!message) return null;
    return (
        <div className="text-xs text-red-600 mt-0.5" role="alert">
            <p>{message}</p>
        </div>
    );
}