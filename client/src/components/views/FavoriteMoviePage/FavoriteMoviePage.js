import React, { useEffect, useState } from 'react';
import classes from './FavoriteMoviePage.module.css';
import axios from 'axios';
import { Row, Col, Card, Button  } from 'antd';
import { IMAGE_URL } from '../../Config';

const { Meta } = Card;

const FavoriteMoviePage = props => {
    const variable = {
        userFrom: localStorage.getItem('userId')
    }

    const [FavoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        fetchFavoriteMovies();
    }, [])

    const fetchFavoriteMovies = () => {
        axios.post('http://localhost:3000/api/favorite/getFavoriteMovie', variable)
            .then(response => {
                if(response.data.success){
                    setFavoriteMovies(response.data.favorites)
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

        axios.post('http://localhost:3000/api/favorite/removeFromFavorite', variable)
            .then(response => {
                if(response.data.success) {
                    fetchFavoriteMovies();
                }else{
                    alert('Failed to remove from favorites')
                }
            })
    }

    return (
        <div style={{width: '85%', margin: '2rem auto'}}>
            <Row gutter={[16, 16]} justify='center'>
                {
                    FavoriteMovies.map((fav, index) => {
                        return <Col key={index} lg={8} md={8} xs={24}>
                            <a href={`/movie/${fav.movieId}`}>
                                <Card
                                    hoverable
                                    cover={<img alt="example" src={fav.movieImage && `${IMAGE_URL}w500${fav.movieImage}`} />}
                                    >
                                    <Meta title={fav.movieTitle} description={'Дата на премиерата: ' + fav.movieReleaseDate} />
                                </Card>
                            </a>
                            <Button block type='danger' onClick={()=>removeHandler(fav.movieId)}>Премахни</Button>
                        </Col>
                    })
                }
            </Row>

            
        </div>
    );
}

export default FavoriteMoviePage;