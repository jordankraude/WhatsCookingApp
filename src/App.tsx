import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import RecipeList from './components/RecipeList';
import Loading from './components/Loading';
import Instructions from './components/Instructions';
import axios from 'axios';
import './styles.css';

const APP_ID = process.env.APPLICATION_ID || '';
const APP_KEY = process.env.APPLICATION_KEY || '';

const App: React.FC = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (ingredients: string) => {
    try {
      setLoading(true);
      const response = await axios.get('https://api.edamam.com/api/recipes/v2', {
        params: {
          type: 'public',
          q: ingredients,
          app_id: APP_ID,
          app_key: APP_KEY,
        },
      });
      setRecipes(response.data.hits.map((hit: any) => hit.recipe));
      setSearched(true);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className='fixed top-0 z-50 w-screen'>
        <h1 className="bg-green-500 dancing-header text-white w-full text-center py-4">What's Cooking!</h1>
        <img src="./Images/WhatsCookingLogo.png" alt="What's Cooking Logo" />
      </div>
      <div className="flex-grow">
        {!searched ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Instructions />
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <SearchForm onSearch={handleSearch} />
            </div>
          </div>
        ) : (
          <>
          <div className='mt-24 fixed left-1/2 transform -translate-x-1/2'>
            <SearchForm onSearch={handleSearch} />
          </div>
            <div className="mt-16">
              {loading ? <Loading /> : <RecipeList recipes={recipes} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
