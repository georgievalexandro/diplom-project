import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import { BackTop } from 'antd';
import { CaretUpFilled } from '@ant-design/icons';
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import MovieDetailPage from "./views/MovieDetailPage/MovieDetailPage";
import GameDetailPage from "./views/GamesPage/GameDetailPage/GameDetailPage";
import Home from "./views/Home/Home";
import FavoriteMoviePage from "./views/FavoriteMoviePage/FavoriteMoviePage";
import FavoriteGamePage from "./views/GamesPage/FavoriteGamePage/FavoriteGamePage";
import AdminPage from "./views/Admin/AdminPage";
import WatchMovieLaterPage from './views/WatchMovieLaterPage/WatchMovieLaterPage';
import GamesPage from './views/GamesPage/GamesPage';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  const style = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  };

  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(Home, null)} />
          <Route exact path="/movies" component={Auth(LandingPage, null)} />
          <Route exact path="/games" component={Auth(GamesPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/movie/:movieId" component={Auth(MovieDetailPage, null)} />
          <Route exact path="/game/:gameId" component={Auth(GameDetailPage, null)} />
          <Route exact path="/favorite-movies" component={Auth(FavoriteMoviePage, true)} />
          <Route exact path="/favorite-games" component={Auth(FavoriteGamePage, true)} />
          <Route exact path="/watchlater-movies" component={Auth(WatchMovieLaterPage, true)} />
          <Route exact path="/admin" component={Auth(AdminPage, true, true)} />
        </Switch>
      </div>
      <BackTop>
        <div style={style}>
          <CaretUpFilled />
        </div>
      </BackTop>
      <Footer />
    </Suspense>
  );
}

export default App;
