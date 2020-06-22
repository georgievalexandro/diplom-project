import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Menu, Icon, Table, Tag, Button, Collapse, Descriptions, notification  } from 'antd';
import CanvasJSReact from '../../../lib/canvasjs.react';
import moment from 'moment';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const { Content, Sider } = Layout;
const { SubMenu } = Menu;
const { Panel } = Collapse;

const AdminPage = props => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentKey, setCurrentKey] = useState(1);
  const [Users, setUsers] = useState([]);
  const [FavoriteMovies, setFavoriteMovies] = useState([]);
  const [FavoriteGames, setFavoriteGames] = useState([]);
  const [UserOpinions, setUserOpinions] = useState([]);
  const [MovieReminders, setMovieReminders] = useState([]);
  const [GameReminders, setGameReminders] = useState([]);

  //const currentDate = moment().format("YYYY-MM-DD");
  const oneDayEarlier = moment().add(1, 'days').format("YYYY-MM-DD");

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const currentItem = (key) => {
    setCurrentKey(key.key);
  }

  useEffect(() => {
      fetchUsers();
      fetchFavoriteMovies();
      fetchFavoriteGames();
      fetchOpinions();
      fetchMovieReminders();
      fetchGameReminders();
  }, [])

  const fetchGameReminders = () => {
    axios.post('http://localhost:3000/api/gamereminder/getGameReminders', {oneDayEarlier})
        .then(response => {
            if(response.data.success){
                setGameReminders(response.data.gamereminders)
            }else {
                console.log('Failed to get game reminders');
            }
        })
  }

  const fetchMovieReminders = () => {
    axios.post('http://localhost:3000/api/moviereminder/getMovieReminders', {oneDayEarlier})
        .then(response => {
            if(response.data.success){
                setMovieReminders(response.data.moviereminders)
            }else {
                console.log('Failed to get movie reminders');
            }
        })
  }

  const fetchOpinions = () => {
    axios.post('http://localhost:3000/api/useropinion/getOpinions')
        .then(response => {
            if(response.data.success){
                setUserOpinions(response.data.opinions)
            }else {
                alert('Failed to get favorite games');
            }
        })
  }

  const fetchFavoriteGames = () => {
    axios.post('http://localhost:3000/api/users/getFavoriteGame')
        .then(response => {
            if(response.data.success){
                setFavoriteGames(response.data.favorites);
            }else {
                alert('Failed to get favorite games');
            }
        })
  }

  const fetchFavoriteMovies = () => {
    axios.post('http://localhost:3000/api/users/getFavoriteMovie')
        .then(response => {
            if(response.data.success){
                setFavoriteMovies(response.data.favorites)
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
  let gameGenresOptions = null;
  let gamePlatformsOptions = null;
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

  let gameGenres = [];
  let gameGenresMap = [];
  FavoriteGames.map(game => game.gameGenre.map(genre => gameGenres.push(genre.name)));
  if(gameGenres.length != 0) {
    for (let i = 0; i < gameGenres.length; i++) {
      let item = gameGenres[i];
      gameGenresMap[item] = (gameGenresMap[item] + 1) || 1;
    }
    
    gameGenresOptions = {
      title: {
        text: "Предпочитани жанрове"
      },
      data: [{				
                type: "column",
                dataPoints: [
                    { label: "Action",  y: gameGenresMap["Action"] || null  },
                    { label: "Adventure", y: gameGenresMap["Adventure"] || null  },
                    { label: "RPG", y: gameGenresMap["RPG"] || null  },
                    { label: "Shooter",  y: gameGenresMap["Shooter"] || null  },
                    { label: "Strategy",  y: gameGenresMap["Strategy"] || null  },
                    { label: "Indie",  y: gameGenresMap["Indie"] || null  },
                    { label: "Simulation",  y: gameGenresMap["Simulation"] || null  },
                    { label: "Sports",  y: gameGenresMap["Sports"] || null  },
                    { label: "Racing",  y: gameGenresMap["Racing"] || null  },
                    { label: "Casual",  y: gameGenresMap["Casual"] || null  },
                    { label: "Massively Multiplayer",  y: gameGenresMap["Massively Multiplayer"] || null  },
                ]
       }],
       backgroundColor: null,
       exportEnabled: true,
       exportFileName: "Range Spline Area",
   }
  }

  let gamePlatforms = [];
  let gamePlatformsMap = [];
  FavoriteGames.map(game => game.preferedPlatform.map(platform => gamePlatforms.push(platform.platform.name)));

  if(gamePlatforms.length != 0) {
    for (let i = 0; i < gamePlatforms.length; i++) {
      let item = gamePlatforms[i];
      gamePlatformsMap[item] = (gamePlatformsMap[item] + 1) || 1;
    }
    
    gamePlatformsOptions = {
      title: {
        text: "Предпочитани платформи"
      },
      data: [{				
                type: "column",
                dataPoints: [
                    { label: "PlayStation 4",  y: gamePlatformsMap["PlayStation 4"] || null  },
                    { label: "PlayStation 5", y: gamePlatformsMap["PlayStation 5"] || null  },
                    { label: "Xbox Series X", y: gamePlatformsMap["Xbox Series X"] || null  },
                    { label: "Xbox One",  y: gamePlatformsMap["Xbox One"] || null  },
                    { label: "PC",  y: gamePlatformsMap["PC"] || null  },
                    { label: "Nintendo Switch",  y: gamePlatformsMap["Nintendo Switch"] || null  },
                    { label: "Android",  y: gamePlatformsMap["Android"] || null  },
                    { label: "PlayStation 3",  y: gamePlatformsMap["PlayStation 3"] || null  },
                    { label: "Xbox 360",  y: gamePlatformsMap["Xbox 360"] || null  },
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
                  alert('Failed to delete account');
              }
          })
  }

  const movieNotificationHandler = (reminder) => {
    const variable = {
      userName: reminder.userName,
      userEmail: reminder.userEmail,
      movieTitle: reminder.movieTitle,
      movieReleaseDate: reminder.movieReleaseDate
    }
    console.log(reminder);
    axios.post('http://localhost:3000/api/sendmail/sendMovieReminder', variable)
    .then(response => {
      
    });

    notification.open({
      message: 'Успешно напомняне!',
      description: reminder.userName + ' беше успешно известен за премиерата на филма ' + reminder.movieTitle,
      onClick: () => {
        console.log('Notification Clicked!');
      },
  });
  }

  const gameNotificationHandler = (reminder) => {
    const variable = {
      userName: reminder.userName,
      userEmail: reminder.userEmail,
      gameTitle: reminder.gameTitle,
      gameReleaseDate: reminder.gameReleaseDate
    }
    console.log(reminder);
    axios.post('http://localhost:3000/api/sendmail/sendGameReminder', variable)
    .then(response => {
      
    });

    notification.open({
      message: 'Успешно напомняне!',
      description: reminder.userName + ' беше успешно известен за новата игра ' + reminder.gameTitle,
      onClick: () => {
        console.log('Notification Clicked!');
      },
  });
  }

    let content = '';

    if(currentKey == 5) {
      content = (
        <Collapse >
          {UserOpinions && UserOpinions.map((opinion, index) => {
            return <Panel header={[opinion.firstName, ' ', opinion.lastName, ' ', <Tag color="green">{opinion.email}</Tag>]} key={opinion._id}>
                <p>{opinion.message}</p>
                <Button href={`mailto:${opinion.email}?subject=Благодарим ви за съдействието`} type='primary'>Отговори</Button>
              </Panel>
          })}
        </Collapse>
      );
    }
    else if(currentKey == 4) {
      content = (
        <>
          <div>
          <h2 style={{color: '#709abf', fontSize: '25px'}}>Филми</h2>
            {MovieReminders.map(reminder => {
              return <Descriptions key={reminder._id} style={{border: '1.5px solid #709abf', padding: '10px', borderRadius: '5px'}}>
                <Descriptions.Item label="Име на потребител">{reminder.userName}</Descriptions.Item>
                <Descriptions.Item label="Имейл">{reminder.userEmail}</Descriptions.Item>
                <Descriptions.Item label="Заглавие на филма">{reminder.movieTitle}</Descriptions.Item>
                <Descriptions.Item label="Дата на премиерата">{reminder.movieReleaseDate}</Descriptions.Item>
                <Descriptions.Item>
                  <Button onClick={() => movieNotificationHandler(reminder)} type='primary'>Напомни <Icon type="bell" theme="filled" style={{color: 'red'}}/></Button>
                </Descriptions.Item>
              </Descriptions>
            })}
          </div>
          
          <div>
          <h2 style={{color: '#709abf', fontSize: '25px'}}>Игри</h2>
          {GameReminders.map(reminder => {
            return <Descriptions key={reminder._id} style={{border: '1.5px solid #709abf', padding: '10px', borderRadius: '5px'}}>
              <Descriptions.Item label="Име на потребител">{reminder.userName}</Descriptions.Item>
              <Descriptions.Item label="Имейл">{reminder.userEmail}</Descriptions.Item>
              <Descriptions.Item label="Заглавие на играта">{reminder.gameTitle}</Descriptions.Item>
              <Descriptions.Item label="Дата на премиерата">{reminder.gameReleaseDate}</Descriptions.Item>
              <Descriptions.Item>
                <Button onClick={()=>gameNotificationHandler(reminder)} type='primary'>Напомни <Icon type="bell" theme="filled" style={{color: 'red'}}/></Button>
              </Descriptions.Item>
            </Descriptions>
            })}
          </div>
        </>
      );
    }
    else if(currentKey == 3) {
      content = (
        <div>
          {gameGenresOptions && <CanvasJSChart options = {gameGenresOptions}
            /* onRef = {ref => this.chart = ref} */
          />}
          <br />
          <hr />
          <br />
          {gamePlatformsOptions && <CanvasJSChart options = {gamePlatformsOptions}
            /* onRef = {ref => this.chart = ref} */
          />}
        </div>
      );
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
              <Menu.Item key="4"><Icon type="bell" /> Напомняния</Menu.Item>
              <Menu.Item key="5"><Icon type="wechat" /> Мнения</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{overflowX: 'unset', background: '#ffffff'}}>
          <Content style={{ margin: '50px 16px 0 16px' }}>
            {content}
          </Content>
        </Layout>
      </Layout>
    )
}

export default AdminPage;