import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Menu, Icon, Table, Tag, Button } from 'antd';
import CanvasJSReact from '../../../lib/canvasjs.react';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const AdminPage = props => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentKey, setCurrentKey] = useState(1);
  const [Users, setUsers] = useState([]);
  const [FavoriteMovies, setFavoriteMovies] = useState([]);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const currentItem = (key) => {
    setCurrentKey(key.key);
  }

  useEffect(() => {
      fetchUsers();
      fetchFavoriteMovies();
  }, [])

  const fetchFavoriteMovies = () => {
    axios.post('http://localhost:3000/api/users/getFavoriteMovie')
        .then(response => {
            if(response.data.success){
                setFavoriteMovies(response.data.favorites)
                console.log(response.data.favorites);
            }else {
                console.log('Failed to get favorite movies');
            }
        })
}

  const fetchUsers = () => {
    axios.post('http://localhost:3000/api/users/getUsers')
          .then(response => {
              if(response.data.success){
                  setUsers(response.data.users)
              }else {
                  alert('Failed to get users');
              }
          })
  }

  let data = [];
  Users.map((user, index) => {
    return data.push({
      id: user._id,
      key: index,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.image
    });
  })

  let genres = [];
  let genresMap = {};
  let movieOptions = null;
  FavoriteMovies.map(genre => genres.push(genre.movieGenre));
  if(genres.length != 0) {
    for (let i = 0; i < genres.length; i++) {
      let item = genres[i];
      genresMap[item] = (genresMap[item] + 1) || 1;
    }
    
    movieOptions = {
      title: {
        text: "Предпочитани жанрове"
      },
      data: [{				
                type: "column",
                dataPoints: [
                    { label: "Екшън",  y: genresMap["Екшън"] || null  },
                    { label: "Семеен", y: genresMap["Семеен"] || null  },
                    { label: "Приключение", y: genresMap["Приключение"] || null  },
                    { label: "Комедия",  y: genresMap["Комедия"] || null  },
                    { label: "Фентъзи",  y: genresMap["Фентъзи"] || null  },
                    { label: "Анимация",  y: genresMap["Анимация"] || null  },
                    { label: "Романс",  y: genresMap["Романс"] || null  },
                    { label: "Драма",  y: genresMap["Драма"] || null  },
                    { label: "Военен",  y: genresMap["Военен"] || null  },
                    { label: "Исторически",  y: genresMap["Исторически"] || null  },
                    { label: "Трилър",  y: genresMap["Трилър"] || null  },
                    { label: "Ужас",  y: genresMap["Ужас"] || null  },
                    { label: "Научна-фантастика",  y: 25 || genresMap["Научна-фантастика"] || null  },
                    { label: "Криминален",  y: genresMap["Криминален"] || null  },
                    { label: "Мистерия",  y: genresMap["Мистерия"] || null  },
                    { label: "Документален",  y: genresMap["Документален"] || null  },
                    { label: "Уестърн",  y: genresMap["Уестърн"] || null  }
                ]
       }],
       backgroundColor: null,
       exportEnabled: true,
       exportFileName: "Range Spline Area",
   }
  }

  const columns = [
    {
      align: 'center',
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: text => <img src={text}/>,
    },
    {
      align: 'center',
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      align: 'center',
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      align: 'center',
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
      render: role => {
        return !role ? <Tag color="geekblue">Subscriber</Tag> : role === 2 ? <Tag color="red">Superadmin</Tag> : <Tag color="green">Admin</Tag>;
      }
    },
    {
      align: 'center',
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          {record.role === 2 ? <Icon type="close-circle" /> :
          record.role ? <><Button type='danger' ghost shape='round' style={{margin: '5px'}} onClick={()=>removeAdminHandler(record.id)}>Remove admin role</Button>
                          <Button type='danger' shape='round' style={{margin: '5px'}} onClick={()=>deleteAccountHandler(record.id)}><Icon type="user-delete" /> Delete account</Button></> : 
                          <><Button type='primary' shape='round' style={{margin: '5px'}} onClick={()=>makeAdminHandler(record.id)}>Make admin</Button>
                          <Button type='danger' shape='round' style={{margin: '5px'}} onClick={()=>deleteAccountHandler(record.id)}><Icon type="user-delete" /> Delete account</Button></>
                          }
        </div>
      },
    },
  ];

  const makeAdminHandler = (id) => {
    console.log(id);
    let userId = id;
    axios.post('http://localhost:3000/api/users/makeAdmin', {userId})
          .then(response => {
              if(response.data.success){
                  fetchUsers();
              }else {
                  alert('Failed to make admin');
              }
          })
  }
  const removeAdminHandler = (id) => {
    console.log(id);
    let userId = id;
    axios.post('http://localhost:3000/api/users/removeAdmin', {userId})
          .then(response => {
              if(response.data.success){
                  fetchUsers();
              }else {
                  alert('Failed to make admin');
              }
          })
  }

  const deleteAccountHandler = (id) => {
    console.log(id);
    let userId = id;
    axios.post('http://localhost:3000/api/users/deleteAccount', {userId})
          .then(response => {
              if(response.data.success){
                  fetchUsers();
              }else {
                  alert('Failed to make admin');
              }
          })
  }

  

    let content = '';

    if(currentKey == 5) {
      content = (<h1>Мнения</h1>);
    }
    else if(currentKey == 4) {
      content = (<h1>Съобщения</h1>);
    }
    else if(currentKey == 3) {
      content = (<h1>Игри</h1>);
    }
    else if(currentKey == 2) {
      content = (
        <div>
          {movieOptions && <CanvasJSChart options = {movieOptions}
            /* onRef = {ref => this.chart = ref} */
          />}
        </div>
      );
    }
    else if(currentKey == 1) {
      content = <Table columns={columns} dataSource={data} align='center' pagination={false} style={{backgroundColor: '#ffffff'}}/>;
    }

    return ( 
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} theme='light'> 
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" onClick={(key) => currentItem(key)}>
            <Menu.Item key="1">
              <Icon type="team" />
              <span>Акаунти</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="bar-chart" />
                  <span>Отчети</span>
                </span>
              }
            >
              <Menu.Item key="2"><Icon type="video-camera" /> Филми</Menu.Item>
              <Menu.Item key="3"><Icon type="laptop" /> Игри</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="notification" />
                  <span>Известия</span>
                </span>
              }
            >
              <Menu.Item key="4"><Icon type="message" /> Съобщения</Menu.Item>
              <Menu.Item key="5"><Icon type="wechat" /> Мнения</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '50px 16px 0 16px' }}>
            {content}
          </Content>
        </Layout>
      </Layout>
    )
}

export default AdminPage;