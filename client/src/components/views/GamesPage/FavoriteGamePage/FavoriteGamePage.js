import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Card, Button  } from 'antd';

const { Meta } = Card;

const FavoriteGamePage = props => {
    const variable = {
        userFrom: localStorage.getItem('userId')
    }

    const [FavoriteGames, setFavoriteGames] = useState([]);

    useEffect(() => {
        fetchFavoriteGames();
    }, [])

    const fetchFavoriteGames = () => {
        axios.post('http://localhost:3000/api/favoritegame/getFavoriteGame', variable)
            .then(response => {
                if(response.data.success){
                    setFavoriteGames(response.data.favorites);
                    console.log(response.data.favorites);
                }else {
                    alert('Failed to get favorite games');
                }
            })
    }

    const removeHandler = (gameId) => {
        const variable = {
            gameId: gameId,
            userFrom: localStorage.getItem('userId')
        }

        axios.post('http://localhost:3000/api/favoritegame/removeFromFavorite', variable)
            .then(response => {
                if(response.data.success) {
                    fetchFavoriteGames();
                }else{
                    alert('Failed to remove from favorites')
                }
            })
    }

    return (
        <div style={{width: '85%', margin: '2rem auto'}}>
            <Row gutter={[16, 16]} justify='center'>
                {
                    FavoriteGames.map((fav, index) => {
                        return <Col key={index} lg={8} md={8} xs={24}>
                            <a href={`/game/${fav.gameId}`}>
                                <Card
                                    hoverable
                                    cover={<img alt="example" src={fav.gameImage} />}
                                    >
                                    <Meta title={fav.gameTitle} description={'Официална дата: ' + fav.gameReleaseDate} />
                                </Card>
                            </a>
                            <Button  style={{borderRadius: 0}} block type='danger' onClick={()=>removeHandler(fav.gameId)}>Премахни</Button>
                        </Col>
                    })
                }
            </Row>

            
        </div>
    );
}

export default FavoriteGamePage;