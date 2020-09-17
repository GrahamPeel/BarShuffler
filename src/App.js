// Stuff
import React from 'react';
import { Route } from 'react-router'
// Pages
import Home from './pages/Home'
import Inventory from './pages/Inventory'
import Recipes from './pages/Recipes'
import CreateRecipe from './pages/CreateRecipe'
// Components
import { Layout } from './components/Layout'
// styles
import './App.css';

function App() {
  return (
    <Layout>
      <Route exact path='/' component={Home} />
      <Route path='/inventory' component={Inventory} />
      <Route path='/recipes' component={Recipes} />
      <Route path='/createrecipe' component={CreateRecipe} />
    </Layout>
  );
}

export default App;