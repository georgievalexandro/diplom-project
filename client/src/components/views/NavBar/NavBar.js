import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button, Icon } from 'antd';
import { useSelector } from "react-redux";
import './Sections/Navbar.css';
import logo from '../../../assets/images/logo.png';

function NavBar() {
  const user = useSelector(state => state.user)
  let userName = '';
  if(user.userData && user.userData.isAuth) {
    userName = user.userData.name;
  }

  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%', paddingLeft: 0 }}>
      <div className="menu__logo">
        <a href="/" style={{padding: 0}}>
          <img src={logo} style={{width: '150px', height: '70px'}}/>
        </a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer
          title={'Здравей ' + userName}
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar