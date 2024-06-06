import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import RecipeList from './components/RecipeList';
import Loading from './components/Loading';
import Instructions from './components/Instructions';
import Favorites from './components/Favorites';
import './styles.css';
import axios from 'axios';

const APP_ID = process.env.APPLICATION_ID || '';
const APP_KEY = process.env.APPLICATION_KEY || '';

const App: React.FC = () => {
  // use state to hold the recipes and keep app constantly refreshing when needed
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // async function to handle search and api call (whole premis of app)
  const handleSearch = async (ingredients: string) => {
    try {
      // sets state in case loading time is long then will display loading display
      setLoading(true);
      // documentation for sending request
      const response = await axios.get('https://api.edamam.com/api/recipes/v2', {
        params: {
          type: 'public',
          // ingredients is basically the query given by the user
          q: ingredients,
          // my user id and key to access my api
          app_id: APP_ID,
          app_key: APP_KEY,
        },
      });
      // sets states of recipes to refresh page
      setRecipes(response.data.hits.map((hit: any) => hit.recipe));
      setSearched(true);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // basic code for web page
    <Router>
      <div className="min-h-screen flex flex-col">
        <div className="fixed top-0 z-50 w-full bg-green-500 py-4">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center fixed left-1/2 transform -translate-x-1/2 animationStart">
              <h1 className="text-white text-4xl font-bold flex items-center dancing-header">
                <Link to='/'>
                  What's Cooking!
                </Link>
                <Link to='/'>
                  <img className="h-10 ml-2 mb-4" src={require('./Images/WhatsCookingLogoWhite.png').default} alt="What's Cooking Logo" />
                </Link>
              </h1>
            </div>
            <div>
              <Link to="/favorites" className="text-white underline dancing-header text-2xl hover:text-green-700 ease-in-out transition-colors">Favorites</Link>
            </div>
          </div>
        </div>
        <div className="flex-grow mt-24">
          <Routes>
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/" element={
              !searched ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <Instructions />
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                    <SearchForm onSearch={handleSearch} />
                  </div>
                </div>
              ) : (
                <>
                  <div className="fixed left-1/2 transform -translate-x-1/2 z-50">
                    <SearchForm onSearch={handleSearch} />
                  </div>
                  <div>
                    {loading ? <Loading /> : <RecipeList recipes={recipes} />}
                  </div>
                </>
              )
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
