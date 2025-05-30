// header.tsx

import { Icon } from "@iconify/react";
import { useAuth } from "../../hooks/useAuth";
import { LogoutButton } from "../LogoutButton";
import "./header.scss"

type ProfileProps = {
    name: string;
}

export const Profile = ({ name }: ProfileProps) => {
    return <p className='profile-text'>{name}</p>
}



// header component imported in App.tsx
export function Header() {


    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    // when field is not empty and button is clicked go to search page
    const handleSearch = () => {
        if (!searchValue.trim()) return;
        navigate(`/search?ingredients=${encodeURIComponent(searchValue)}`);
    };

    // go to search page when enter is pressed
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch();
    };


    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    // when field is not empty and button is clicked go to search page
    const handleSearch = () => {
        if (!searchValue.trim()) return;
        navigate(`/search?ingredients=${encodeURIComponent(searchValue)}`);
    };

    // go to search page when enter is pressed
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <header id="header">
            <div id="header-upper">
                <div id="header-logo">
                    <Icon id="logo-icon" icon="material-symbols:fastfood-outline"></Icon>
                    <h1 id="header-title">Food & Flavours</h1>
                </div>
                <div id="header-weather">
                    <Icon className="weather-icon" icon="mdi:weather-partly-cloudy"></Icon>
                    <div className="temp-container">
                        <p className="temp-header">30°C</p>
                        <div className="temp-degree-container">
                            <p className="temp-degree-text">Precipitations</p>
                            <p className="temp-degree-text">Max.: 34º Min.: 28º</p>
                        </div>
                    </div>
                </div>
                <ClickableProfileIcon />
            </div>
            <div id="header-lower">
                <div id="search-container">
                    <input
                        id="search-bar"
                        type="text"
                        placeholder="Search ingredients (comma-separated)"
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button id="search-button" onClick={handleSearch}>
                        <span id="search-button-text">Search</span>
                        <Icon id="search-icon" icon="ic:baseline-arrow-forward-ios" />
                    </button>
                </div>
                <div id="dropdown-container">
                    <button title='dropdown-button' id="dropdown-button">
                        <Icon className="dropdown-icon" icon="ic:baseline-restaurant-menu"></Icon>
                        <Icon className="dropdown-icon dropdown-menu" icon="ic:baseline-menu"></Icon>
                    </button>
                </div>
            </div>
        </header>
    )
}