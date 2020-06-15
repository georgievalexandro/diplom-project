import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'antd';
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
        axios.post('http://localhost:3000/api/favoritegame/favorited', variable)
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
            axios.post('http://localhost:3000/api/favoritegame/removeFromFavorite', variable)
                .then(response => {
                    if(response.data.success){
                        setFavoritedNumber(!Favorited);
                    } else {
                        alert('Failed to remove from favorites');
                    }
                })
        } else {
            axios.post('http://localhost:3000/api/favoritegame/addToFavorite', variable)
                .then(response => {
                    if(response.data.success){
                        setFavoritedNumber(!Favorited);
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
        <Button onClick={favoriteHandler} style={{display: 'block', marginLeft: 'auto', borderRadius: 0}}>
            {Favorited ? 
                (<>Премахни <HeartFilled style={{color: 'red'}}/></>):
                (<>Добави <HeartOutlined style={{color: 'red'}}/></>)}
        </Button>


    );
}

export default ToggleFavoriteButton;