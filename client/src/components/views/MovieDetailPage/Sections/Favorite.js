import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, notification } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';

const Favorite = props => {
    const [Favorited, setFavoritedNumber] = useState(false);

    let movieGenre = '';
    if(props.movieInfo.genres) {
        movieGenre = props.movieInfo.genres[0].name;
    }
    
    const variable = {
        userFrom: props.userFrom,
        movieId: props.movieId,
        movieTitle: props.movieInfo.title || props.movieInfo.original_title,
        movieImage: props.movieInfo.backdrop_path,
        movieRunTime: props.movieInfo.runtime,
        movieReleaseDate: props.movieInfo.release_date,
        movieGenre: movieGenre
    }
    
    
    useEffect(() => {
        axios.post('http://localhost:3000/api/favorite/favorited', variable)
        .then(response => {
            if(response.data.success){
                setFavoritedNumber(response.data.favorited);
            } else {
                console.log('Failed to get FavoriteNumber info');
            }
        })
    }, [])

    const favoriteHandler = () => {
        if(Favorited) {
            axios.post('http://localhost:3000/api/favorite/removeFromFavorite', variable)
                .then(response => {
                    if(response.data.success){
                        setFavoritedNumber(!Favorited);
                    } else {
                        console.log('Failed to remove from favorites');
                    }
                })
        } else {
            const visitFavorite = (<Button type='primary' href='/favorite-movies' target='_blank'>Виж колекция</Button>);
            axios.post('http://localhost:3000/api/favorite/addToFavorite', variable)
                .then(response => {
                    if(response.data.success){
                        setFavoritedNumber(!Favorited);
                        notification.open({
                            message: 'Успешно добавено в любими',
                            description:
                               visitFavorite,
                            onClick: () => {
                              console.log('Notification Clicked!');
                            },
                          });
                    } else {
                        Modal.info({
                            title: 'Моля влезте в профила си!',
                            content: (
                              <div>
                                <p>За да можете да добавяте филми в колекцията, <b><i>любими</i></b>, трябва да влезете в профила си или да се регистрирате ако нямате такъв.</p>
                              </div>
                            ),
                            onOk() {},
                        });
                    }
                })
        }
    }

    return (
        <Button onClick={favoriteHandler} style={{margin: '5px'}}>
            {Favorited ? 
                (<>Премахни <HeartFilled style={{color: 'red'}}/></>):
                (<>Добави <HeartOutlined style={{color: 'red'}}/></>)}
        </Button>
    );
}

export default Favorite;