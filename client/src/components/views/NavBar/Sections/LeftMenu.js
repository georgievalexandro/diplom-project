import React from 'react';
import { Menu } from 'antd';
import movie from '../../../../assets/images/movie.png';
import MenuIcon from '../Icons/MenuIcon';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <SubMenu title="Филми" style={{fontSize: '18px'}}>
        <Menu.Item key="movies">
          <a href="/movies" style={{fontSize: '16px'}}>Филми</a>
        </Menu.Item>
        <Menu.Item key="favoritemovies">
          <a href="/favorite-movies" style={{fontSize: '16px'}}>Любими филми</a>
        </Menu.Item>
        <Menu.Item key="watchlater">
          <a href="/watchlater-movies" style={{fontSize: '16px'}}>Филми за гледане по-късно</a>
        </Menu.Item>
      </SubMenu>
      <SubMenu title="Игри" style={{fontSize: '18px'}}>
        <Menu.Item key="games">
          <a href="/games" style={{fontSize: '16px'}}>Игри</a>
        </Menu.Item>
        <Menu.Item key="favoritegames">
          <a href="/favorite-games" style={{fontSize: '16px'}}>Любими игри</a>
        </Menu.Item>
      </SubMenu>
  </Menu>
  )
}

export default LeftMenu