// header.tsx

import { Icon } from "@iconify/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClickableProfileIcon from "../button/clickableProfileIcon";
import "./header.scss"
import { BaseButton } from "../button/baseButton/baseButton";


// header component imported in App.tsx
export function Header() {

    const [searchValue, setSearchValue] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
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

    const toggleDropdown = () => setDropdownOpen(prev => !prev);

    // when button is clicked go to homepage with filter in url
    const handleFilter = (filter: string) => {
    let query = '';
    if (filter === "Vegetarian") query = "?vegetarian=true";
    if (filter === "Gluten Free") query = "?glutenFree=true";
    if (filter === "Dairy Free") query = "?dairyFree=true";
    navigate("/" + query);
};

    return (
        <header id="header">
            <div id="header-upper">
                <div id="header-logo">
                    <Icon id="logo-icon" icon="material-symbols:fastfood-outline"></Icon>
                    <h1 id="header-title">Food & Flavours</h1>
                </div>
                {/* visible only when device is 1280px or more */}
                <div id="search-container-desktop">
                    <input
                        className="search-bar"
                        type="text"
                        placeholder="Search ingredients (comma-separated)"
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="search-button" onClick={handleSearch}>
                        <span className="search-button-text">Search</span>
                        <Icon className="search-icon" icon="ic:baseline-arrow-forward-ios" />
                    </button>
                </div>
                <ClickableProfileIcon />
            </div>
            {/* visible only when device is mobile or tablet */}
            <div id="header-lower">
                <div id="search-container">
                    <input
                        className="search-bar"
                        type="text"
                        placeholder="Search ingredients (comma-separated)"
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="search-button" onClick={handleSearch}>
                        <span className="search-button-text">Search</span>
                        <Icon className="search-icon" icon="ic:baseline-arrow-forward-ios" />
                    </button>
                </div>
                {/* visible only when device is mobile or tablet */}
                <div id="dropdown-container">
                    <button
                        type='button'
                        title='dropdown-button'
                        id="dropdown-button"
                        onClick={toggleDropdown}
                        aria-expanded={dropdownOpen}
                        aria-haspopup="true"
                    >
                        <Icon className="dropdown-icon" icon="ic:baseline-restaurant-menu" />
                        <Icon className="dropdown-icon dropdown-menu" icon="ic:baseline-menu" />
                    </button>
                    {dropdownOpen && (
                        <ul className="dropdown-menu-list">
                            <li onClick={() => { handleFilter("All Eater"); setDropdownOpen(false); }}>Home</li>
                            <li onClick={() => { handleFilter("Vegetarian"); setDropdownOpen(false); }}>Vegetarian</li>
                            <li onClick={() => { handleFilter("Gluten Free"); setDropdownOpen(false); }}>Gluten Free</li>
                            <li onClick={() => { handleFilter("Dairy Free"); setDropdownOpen(false); }}>Dairy Free</li>
                        </ul>
                    )}
                </div>
                {/* visible only when device is 1280px or more */}
                <div id="header-buttons-container" className="desktop-filters">
                    <BaseButton onClick={() => handleFilter("All Eater")}>Home</BaseButton>
                    <BaseButton onClick={() => handleFilter("Vegetarian")}>Vegetarian</BaseButton>
                    <BaseButton onClick={() => handleFilter("Gluten Free")}>Gluten Free</BaseButton>
                    <BaseButton onClick={() => handleFilter("Dairy Free")}>Dairy Free</BaseButton>
                </div>
            </div>
        </header>
    )
}