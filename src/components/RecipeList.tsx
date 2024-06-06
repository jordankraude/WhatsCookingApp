import React from 'react';

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
  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      {recipes.length === 0 ? (
        <p className="text-lg text-green-700 font-semibold">No recipes found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe, index) => (
            <li key={index} className="bg-green-100 shadow-md rounded-md overflow-hidden">
              <img src={recipe.image} alt={recipe.label} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-green-900 mb-2">{recipe.label}</h2>
                <p className="text-sm text-gray-700 mb-4">{recipe.ingredientLines.join(', ')}</p>
                <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">View Recipe</a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;

