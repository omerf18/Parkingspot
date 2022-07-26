import React from 'react';
import './App.scss';
import AppHeader from './cmps/header/app-header';
import Homepage from './pages/homepage/homepage';
import './assets/scss/global.scss';

const App = () => {
  return (
    <div className="App">
      <AppHeader className="app-header" />
      <Homepage/>
    </div>
  );
}

export default App;
