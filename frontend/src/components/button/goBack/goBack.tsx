import { useNavigate } from "react-router-dom";
import "./goBack.scss"

const BackButton = ({ label = 'back' }: { label?: string }) => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(-1)} className="go-back">
            {label}
        </button>
    );
};

export default BackButton;