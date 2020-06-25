import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, notification } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';

const ToggleFavoriteButton = props => {
    const [Favorited, setFavoritedNumber] = useState(false);
    
    const variable = {
        userFrom: props.userFrom,
        gameId: props.gameId,
        gameTitle: props.gameInfo.name,
        gameImage: props.gameInfo.background_image,
        gameReleaseDate: props.gameInfo.released,
        gameGenre: props.gameInfo.genres,
        preferedPlatform: props.gameInfo.platforms
    }
    
    useEffect(() => {
        axios.post('/api/favoritegame/favorited', variable)
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
            axios.post('/api/favoritegame/removeFromFavorite', variable)
                .then(response => {
                    if(response.data.success){
                        setFavoritedNumber(!Favorited);
                    } else {
                        alert('Failed to remove from favorites');
                    }
                })
        } else {
            const visitFavorite = (<Button type='primary' href='/favorite-games' target='_blank'>Виж колекция</Button>);
            axios.post('/api/favoritegame/addToFavorite', variable)
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
                                <p>За да можете да добавяте игри в колекцията, <b><i>любими</i></b>, трябва да влезете в профила си или да се регистрирате ако нямате такъв.</p>
                              </div>
                            ),
                            onOk() {},
                        });
                    }
                })
        }
    }
    
    return (
        <Button onClick={favoriteHandler} style={{borderRadius: 0}}>
            {Favorited ? 
                (<>Премахни <HeartFilled style={{color: 'red'}}/></>):
                (<>Добави <HeartOutlined style={{color: 'red'}}/></>)}
        </Button>
    );
}

export default ToggleFavoriteButton;