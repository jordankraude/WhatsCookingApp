import React, { useState } from 'react';
import FavoritedHeartIcon from '../Images/favorited.png';
import UnFavoritedHeartIcon from '../Images/unfavorited.png' 

// interface representing data to be expected from api response for proper typing
interface Recipe {
  label: string;
  image: string;
  ingredientLines: string[];
  url: string;
}

interface RecipeListProps {
  recipes: Recipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  const [favorites, setFavorites] = useState<Recipe[]>(() => {
    const storedFavorites = localStorage.getItem('favoriteRecipes');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // code for handling changes to favorites/setting favorites in local storage
  const handleFavorite = (recipe: Recipe) => {
    const isFavorite = favorites.some(fav => fav.label === recipe.label);
    const updatedFavorites = isFavorite 
      ? favorites.filter(fav => fav.label !== recipe.label)
      : [...favorites, recipe];

    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (recipe: Recipe) => favorites.some(fav => fav.label === recipe.label);

  return (
    // if recipes display recipes if no recipes say No recipes found with query search
    <div className="container mx-auto px-4 py-8 mt-10">
      {recipes.length === 0 ? (
        <p className="text-lg text-green-700 font-semibold">No recipes found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* maps recipes */}
          {recipes.map((recipe, index) => (
            <li key={index} className="relative bg-green-100 shadow-md rounded-md overflow-hidden">
              <img src={recipe.image} alt={recipe.label} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-green-900 mb-2">{recipe.label}</h2>
                <p className="text-sm text-gray-700 mb-4">{recipe.ingredientLines.join(', ')}</p>
                <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">View Recipe</a>
                <button
                  className="absolute bottom-2 right-2 text-2xl"
                  style={{ fontSize: '1.5rem' }}
                  onClick={() => handleFavorite(recipe)}
                >
                  {isFavorite(recipe) ? <img src={FavoritedHeartIcon} alt="Heart" className="h-6" /> : <img src={UnFavoritedHeartIcon} alt="Heart" className="h-6" />}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;
