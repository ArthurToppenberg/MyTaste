import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface InfoBoxProps {
    text: string;
    loading?: boolean;
}

const InfoBox: React.FC<InfoBoxProps> = ({ text, loading = false }) => {
    return (
        <div className="border rounded shadow-sm p-2 bg-light">
            {loading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status"/>
                </div>
            ) : (
                <p className="m-0">{text}</p>
            )}
        </div>
    );
};

export default InfoBox;