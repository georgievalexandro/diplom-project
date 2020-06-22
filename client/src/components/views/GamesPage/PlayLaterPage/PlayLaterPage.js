import React, { useEffect, useState } from 'react';
import classes from './PlayLaterPage.module.css';
import axios from 'axios';
import { Row, Col, Card, Button, Modal  } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

const { Meta } = Card;

const PlayLaterPage = props => {
    const variable = {
        userFrom: localStorage.getItem('userId')
    }

    const [PlayLaterGames, setPlayLaterGames] = useState([]);
    const [ReminderButtonColor, setReminderButtonColor] = useState('#40a9ff');
    const [ReminderButtonText, setReminderButtonText] = useState('Напомни');
    

    useEffect(() => {
        fetchPlayLaterGames();
    }, [])

    const fetchPlayLaterGames = () => {
        axios.post('http://localhost:3000/api/playlater/getPlayLaterGame', variable)
            .then(response => {
                if(response.data.success){
                    setPlayLaterGames(response.data.playlater);
                    console.log(response.data.playlater);
                }else {
                    alert('Failed to get favorite movies');
                }
            })
    }

    const removeHandler = (gameId) => {
        const variable = {
            gameId: gameId,
            userFrom: localStorage.getItem('userId')
        }

        axios.post('http://localhost:3000/api/playlater/removeFromPlayLater', variable)
            .then(response => {
                if(response.data.success) {
                    fetchPlayLaterGames();
                }else{
                    alert('Failed to remove from play later')
                }
            })

        // axios.post('http://localhost:3000/api/moviereminder/removeReminder', variable)
        // .then(response => {
        //     if(response.data.success) {
        //         console.log('Reminder Removed');
        //     }else{
        //         alert('Failed to remove reminder')
        //     }
        // })
    }

    const setReminder = (play) => {
        let data = {
            userFrom: localStorage.getItem('userId'),
            userName: props.user.userData.name,
            userEmail: props.user.userData.email,
            gameId: play.gameId,
            gameTitle: play.gameTitle,
            gameReleaseDate: play.gameReleaseDate
        }
        Modal.info({
            title: 'Информация',
            content: (
              <div>
                <p style={{fontSize: '18px'}}>
                    На <b>{play.gameReleaseDate}</b> на имейл адрес <b>{props.user.userData.email}</b> ще Ви напомним, че излиза играта <b>{play.gameTitle}</b>.
                </p>
              </div>
            ),
            onOk() {
                setReminderButtonColor('#0d8e33');
                setReminderButtonText('checked');

                axios.post('http://localhost:3000/api/gamereminder/addGameReminder', data)
                .then(response => {
                    if(response.data.success){
                        console.log('Reminder Set');
                    } else {
                        alert('Failed to set reminder');
                    }
                });
            },
        });
    }

    return (
        <div style={{width: '85%', margin: '3rem auto'}}>
            <Row gutter={[16, 16]} justify='center'>
                {
                    PlayLaterGames.map((play, index) => {
                        return <Col key={index} lg={6} md={8} xs={24}>
                            <Card
                                hoverable
                                cover={<img alt="example" src={play.gameImage} />}
                                >
                                <Meta title={play.gameTitle} description={'Дата на премиерата: ' + play.gameReleaseDate} />
                            </Card>
                            <Button block style={{backgroundColor: ReminderButtonColor, color: 'white'}} onClick={()=>setReminder(play)}>{ReminderButtonText === 'checked' ? <CheckOutlined /> : 'Напомни'}</Button>
                            <Button block type='danger' onClick={()=>removeHandler(play.gameId)}>Премахни</Button>
                        </Col>
                    })
                }
            </Row>
        </div>
    );
}

export default PlayLaterPage;