import { Icon } from "@iconify/react";
import "./recipe-card.scss"

function RecipeCard() {
    return (
        <div className="recipe-background">
            <div className="upper-card">
                <img src="https://i.imgur.com/CzXTtJV.jpg" alt="recipe" className="recipe-image" />
            </div>
            <div className="lower-card">
                <h3 className="recipe-title">Rice pudding</h3>
                <div className="types-container">
                    <div className="recipe-type-container">
                        <Icon className="recipe-icon" icon="mdi:leaf"></Icon>
                        <p className="recipe-type">
                            Vegetarian: Yes
                        </p>
                    </div>
                    <div className="recipe-type-container">
                        <Icon className="recipe-icon" icon="mdi:gluten"></Icon>
                        <p className="recipe-type">
                            Glutenfree: Yes
                        </p>
                    </div>
                    <div className="recipe-type-container">
                        <Icon className="recipe-icon" icon="mdi:cow"></Icon>
                        <p className="recipe-type">
                            Dairyfree: Yes
                        </p>
                    </div>
                </div>
                <div className="button-container">
                    <div className="recipe-time">
                        <Icon className="recipe-time-icon" icon="mdi:access-time"></Icon> 
                        <p className="recipe-time-text">45 min</p>
                    </div>
                    <button className="card-button">
                        <Icon className="add-recipe-icon" icon="mdi:invoice-add"></Icon>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RecipeCard