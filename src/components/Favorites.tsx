import React, { useState, useEffect } from 'react';
import HeartIcon from '../Images/favorited.png'; // Import the SVG heart icon

interface Recipe {
  label: string;
  image: string;
  ingredientLines: string[];
  url: string;
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteRecipes');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleRemoveFavorite = () => {
    if (selectedRecipe) {
      const updatedFavorites = favorites.filter(fav => fav.label !== selectedRecipe.label);
      setFavorites(updatedFavorites);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
    }
    setSelectedRecipe(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      {favorites.length === 0 ? (
        <p className="text-lg text-green-700 font-semibold">No favorites found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((recipe, index) => (
            <li key={index} className="relative bg-green-100 shadow-md rounded-md overflow-hidden">
              <img src={recipe.image} alt={recipe.label} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-green-900 mb-2">{recipe.label}</h2>
                <p className="text-sm text-gray-700 mb-4">{recipe.ingredientLines.join(', ')}</p>
                <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">View Recipe</a>
                <button
                  className="absolute bottom-2 right-2 text-red-500"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <img src={HeartIcon} alt="Heart" className="h-6" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      {selectedRecipe && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-md">
            <p className="text-lg text-gray-800 mb-4">Remove {selectedRecipe.label} from Favorites?</p>
            <div className="flex justify-end">
              <button className="mr-4 px-4 py-2 bg-red-500 text-white rounded-md" onClick={handleRemoveFavorite}>Yes</button>
              <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md" onClick={() => setSelectedRecipe(null)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
