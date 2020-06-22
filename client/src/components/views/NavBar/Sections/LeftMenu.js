import React from 'react';
import { Menu } from 'antd';
import { useSelector } from "react-redux";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  const user = useSelector(state => state.user);
  return (
    <Menu mode={props.mode}>
      <SubMenu title="Филми" style={{fontSize: '18px', color: '#709abf'}}>
        <Menu.Item key="movies">
          <a href="/movies" style={{fontSize: '16px', color: '#709abf'}}>Филми</a>
        </Menu.Item>
        <Menu.Item key="favoritemovies">
          <a href="/favorite-movies" style={{fontSize: '16px', color: '#709abf'}}>Любими филми</a>
        </Menu.Item>
        <Menu.Item key="watchlater">
          <a href="/watchlater-movies" style={{fontSize: '16px', color: '#709abf'}}>Филми за гледане по-късно</a>
        </Menu.Item>
      </SubMenu>
      <SubMenu title="Игри" style={{fontSize: '18px', color: '#709abf'}}>
        <Menu.Item key="games">
          <a href="/games" style={{fontSize: '16px', color: '#709abf'}}>Игри</a>
        </Menu.Item>
        <Menu.Item key="favoritegames">
          <a href="/favorite-games" style={{fontSize: '16px', color: '#709abf'}}>Любими игри</a>
        </Menu.Item>
        <Menu.Item key="playlatergames">
          <a href="/playlater-games" style={{fontSize: '16px', color: '#709abf'}}>Играй по-късно</a>
        </Menu.Item>
      </SubMenu>
      {
        user.userData && user.userData.isAuth ? 
        <Menu.Item key="admin">
            <a href="/admin" style={{fontSize: '16px', color: '#709abf'}}>Админ</a>
        </Menu.Item> : null
      }
  </Menu>
  )
}

export default LeftMenu