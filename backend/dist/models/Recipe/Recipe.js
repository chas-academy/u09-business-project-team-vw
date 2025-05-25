"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const RecipeSchema = new Schema({
    originalRecipeId: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    imageUrl: { type: String },
    readyInMinutes: { type: Number },
    servings: { type: Number },
    instructions: { type: String },
    ingredients: { type: [String] },
    isVegetarian: { type: Boolean, default: false },
    isGlutenfree: { type: Boolean, default: false },
    isDairyfree: { type: Boolean, default: false },
    preparationMinutes: { type: Number },
    cookingMinutes: { type: Number },
});
exports.Recipe = mongoose_1.default.model('Recipe', RecipeSchema);
