import React, { useEffect, useState } from 'react';
import classes from './WatchMovieLaterPage.module.css';
import axios from 'axios';
import { Row, Col, Card, Button, Modal  } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { IMAGE_URL } from '../../Config';

const { Meta } = Card;

const WatchMovieLaterPage = props => {
    const variable = {
        userFrom: localStorage.getItem('userId')
    }

    const [WatchLaterMovies, setWatchLaterMovies] = useState([]);
    const [ReminderButtonColor, setReminderButtonColor] = useState('#40a9ff');
    const [ReminderButtonText, setReminderButtonText] = useState('Напомни');
    

    useEffect(() => {
        fetchWatchLaterMovies();
    }, [])

    const fetchWatchLaterMovies = () => {
        axios.post('http://localhost:3000/api/watchlater/getToWatchLaterMovie', variable)
            .then(response => {
                if(response.data.success){
                    setWatchLaterMovies(response.data.toWatchLater);
                    console.log(response.data.toWatchLater);
                }else {
                    alert('Failed to get favorite movies');
                }
            })
    }

    const removeHandler = (movieId) => {
        const variable = {
            movieId: movieId,
            userFrom: localStorage.getItem('userId')
        }

        axios.post('http://localhost:3000/api/watchlater/removeFromWatchLater', variable)
            .then(response => {
                if(response.data.success) {
                    fetchWatchLaterMovies();
                }else{
                    alert('Failed to remove from favorites')
                }
            })

        axios.post('http://localhost:3000/api/moviereminder/removeReminder', variable)
        .then(response => {
            if(response.data.success) {
                console.log('Reminder Removed');
            }else{
                alert('Failed to remove reminder')
            }
        })
    }

    const setReminder = (fav) => {
        let data = {
            userFrom: localStorage.getItem('userId'),
            userName: props.user.userData.name,
            userEmail: props.user.userData.email,
            movieId: fav.movieId,
            movieTitle: fav.movieTitle,
            movieReleaseDate: fav.movieReleaseDate
        }
        Modal.info({
            title: 'Информация',
            content: (
              <div>
                <p style={{fontSize: '18px'}}>
                    На <b>{fav.movieReleaseDate}</b> на имейл адрес <b>{props.user.userData.email}</b> ще Ви напомним да гледате премиерата на <b>{fav.movieTitle}</b>.
                </p>
              </div>
            ),
            onOk() {
                setReminderButtonColor('#0d8e33');
                setReminderButtonText('checked');

                axios.post('http://localhost:3000/api/moviereminder/addMovieReminder', data)
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
                    WatchLaterMovies.map((fav, index) => {
                        return <Col key={index} lg={6} md={8} xs={24}>
                            <Card
                                hoverable
                                cover={<img alt="example" src={fav.movieImage && `${IMAGE_URL}w500${fav.movieImage}`} />}
                                >
                                <Meta title={fav.movieTitle} description={'Дата на премиерата: ' + fav.movieReleaseDate} />
                            </Card>
                            <Button block style={{backgroundColor: ReminderButtonColor, color: 'white'}} onClick={()=>setReminder(fav)}>{ReminderButtonText === 'checked' ? <CheckOutlined /> : 'Напомни'}</Button>
                            <Button block type='danger' onClick={()=>removeHandler(fav.movieId)}>Премахни</Button>
                        </Col>
                    })
                }
            </Row>

            
        </div>
    );
}

export default WatchMovieLaterPage;