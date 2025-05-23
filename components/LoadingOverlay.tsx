import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingOverlay = (props: any) => {
    const { message } = props;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm gap-4 text-white">
            <Loader2 className="h-12 w-12 animate-spin " />
            <div>{message || "Loading..."}</div>
        </div>
    );
};

export default LoadingOverlay;