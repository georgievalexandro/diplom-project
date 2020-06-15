/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import { LogoutOutlined } from '@ant-design/icons';
import './Navbar.css';

function RightMenu(props) {
  const user = useSelector(state => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login" style={{fontSize: '18px'}}>Вход</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register" style={{fontSize: '18px'}}>Регистрация</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <div style={{display: 'flex', alignItems: 'center'}}>
        {user && 
          user.userData ? <div className='NavUsername'>Здравей {user.userData.name}</div> : null}
        <Menu mode={props.mode}>
          <Menu.Item key="logout">
            <a onClick={logoutHandler}><LogoutOutlined style={{fontSize: '20px'}}/> Изход</a>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default withRouter(RightMenu);

