import { useNavigate } from "react-router-dom";

const BackButton = ({ label = 'back' }: { label?: string }) => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            style={{
                padding: '0.5rem 1rem',
                fontSize: '1rem',
                cursor: 'pointer',
                borderRadius: '8px',
                backgroundColor: '#AAAAAA',
                border: 'none'
            }}
        >
            {label}
        </button>
    );
};

export default BackButton;