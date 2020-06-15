import React, { useEffect, useState } from 'react';
import { Typography, Row, Button, Breadcrumb } from 'antd';
import classes from './GamesPage.module.css';
import MainImage from '../LandingPage/Sections/MainImage';
import GameCard from './Sections/GameCard';

const GamesPage = props => {
    const [Games, setGames] = useState([]);
    const [NextPage, setNextPage] = useState(0);

    useEffect(() => {
        fetch('https://api.rawg.io/api/games?dates=2020-06-06,2021-06-06&ordering=-added')
            .then(res => res.json())
            .then(res => {
                setGames([...Games, ...res.results]);
                setNextPage(res.next);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const loadMore = () => {
        fetch(NextPage)
            .then(res => res.json())
            .then(res => {
                setGames([...Games, ...res.results]);
                setNextPage(res.next);
            })
            .catch(err => {
                console.log(err);
            })
    }
    {Games && console.log(Games);}
    return (
        <div className={classes.Container}>
            {Games[0] && 
                <MainImage image={Games[0].background_image} 
                    title={Games[0].name}/>
            }

            <div style={{width: '85%', margin: '1rem auto'}}>
                <Breadcrumb separator=">" style={{textAlign: 'center', marginBottom: '50px'}}>
                    <Breadcrumb.Item href="/">Начална страница</Breadcrumb.Item>
                    <Breadcrumb.Item href="/games">Игри</Breadcrumb.Item>
                </Breadcrumb>

                <Row gutter={[16, 16]}>
                    {Games && Games.map((game, index) => (
                        <React.Fragment key={index}>
                            <GameCard 
                                image={game.background_image}
                                gameId={game.id}
                                name={game.name}
                            />
                        </React.Fragment>
                    ))}
                </Row>

                <br />
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button type='ghost' size='large' onClick={loadMore}>Виж повече</Button>
                </div>
            </div>
        </div>
    );
}

export default GamesPage;