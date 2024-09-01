import * as React from 'react';

interface EmailTemplateProps {
    firstName: string;
}

export const ScanEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
}) => (
    <div>
        <h1>We just scanned your sites, {firstName}!</h1>
    </div>
);