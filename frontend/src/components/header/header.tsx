import { Icon } from "@iconify/react";
import "./header.scss"

export function Header() {
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
                <div id="header-profile">
                    <Icon className="profile-icon" icon="mdi:person-circle"></Icon>
                    <p className="profile-text">Username</p>
                </div>
            </div>
        </header>
    )
}