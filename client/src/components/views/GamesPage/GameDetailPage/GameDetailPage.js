import React, { useEffect, useState } from 'react';
import { Collapse, Tag, Popover, Typography, Button, Row, Col } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import YouTube from '@u-wave/react-youtube';

import MainImage from '../../LandingPage/Sections/MainImage';
import GameCard from '../Sections/GameCard';
import ToggleFavoriteButton from '../Sections/ToggleFavoriteButton';

const { Panel } = Collapse;
const TAG_COLORS = {
    'RPG': 'blue',
    'Семеен': 'yellow',
    'Adventure': 'green',
    'Комедия': 'orange',
    'Shooter': 'purple',
    'Action': 'red',
    'Романс': 'pink',
    default: 'black'
}

function GameDetailPage(props) {
    const [Game, setGame] = useState([]);
    const [GameGenres, setGameGenres] = useState(0);
    const [GameStores, setGameStores] = useState(0);
    const [GamePlatforms, setGamePlatforms] = useState(0);
    const [GameTags, setGameTags] = useState(0);
    const [GameScreenshots, setGameScreenshots] = useState(0);
    const [SimilarGames, setSimilarGames] = useState(0);
    const [GameVideo, setGameVideo] = useState(0);

    const gameId = props.match.params.gameId;
    useEffect(() => {
        fetch(`https://api.rawg.io/api/games/${gameId}`)
            .then(res => res.json())
            .then(res => {
                setGame(res);
                setGameGenres(res.genres);
                setGameStores(res.stores);
                setGamePlatforms(res.platforms);
                setGameTags(res.tags);
            })
            .catch(err => console.log(err));
    }, []);
    useEffect(() => {
        fetch(`https://api.rawg.io/api/games/${gameId}/screenshots`)
            .then(res => res.json())
            .then(res => {
                setGameScreenshots(res.results);
            })
            .catch(err => console.log(err));
    }, []);
    useEffect(() => {
        fetch(`https://api.rawg.io/api/games/${gameId}/suggested`)
            .then(res => res.json())
            .then(res => {
                setSimilarGames(res.results);
            })
            .catch(err => console.log(err));
    }, []);
    useEffect(() => {
        fetch(`https://api.rawg.io/api/games/${gameId}/youtube`)
            .then(res => res.json())
            .then(res => {
                setGameVideo(res.results[0].external_id);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            {Game && 
                <MainImage image={Game.background_image} 
                    title={Game.name}/>
            }

            <div style={{width: '85%', margin: '3rem auto', boxShadow: '0px 0px 60px -40px rgba(0,0,0,0.5)'}}>
                <ToggleFavoriteButton 
                    userFrom={localStorage.getItem('userId')}
                    gameId={gameId}
                    gameInfo={Game}    
                />
                <Collapse 
                    defaultActiveKey={['1']}
                    style={{fontSize: '16px', fontWeight: '600', background: '#ffffff', marginBottom: '30px'}}
                    bordered={false}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}>
                    <Panel header="Описание" key="1" className="site-collapse-custom-panel">
                        <div style={{fontSize: '14px'}} dangerouslySetInnerHTML={{__html: Game.description}}></div>
                    </Panel>
                    <Panel header="Жанрове" key="2" className="site-collapse-custom-panel">
                        {   GameGenres &&
                            GameGenres.map((genre, index) => {
                                return <Tag 
                                    style={{margin: '5px'}}
                                    key={index}
                                    color={TAG_COLORS[genre.name] || TAG_COLORS['default']}>{genre.name}</Tag>
                            })
                        }
                    </Panel>
                    <Panel header="Тагове" key="3" className="site-collapse-custom-panel">
                        {   GameTags &&
                            GameTags.map((tag, index) => {
                                const content = (
                                    <img src={tag.image_background} style={{width: '300px', height: '300px'}}/>
                                );
                                return <Popover key={index} content={content}>
                                    <Tag 
                                        color="#40a9ff"
                                        style={{margin: '5px'}}>
                                        <b>{tag.name}</b>
                                    </Tag>
                                </Popover>
                            })
                        }
                    </Panel>
                    <Panel header="Официална дата" key="4" className="site-collapse-custom-panel">
                        <b>{Game.released}</b>
                    </Panel>
                    <Panel header="Онлайн магазини предлагащи играта" key="5" className="site-collapse-custom-panel">
                        {   GameStores &&
                            GameStores.map((store, index) => {
                                return <Button 
                                    key={index}
                                    style={{margin: '5px'}}
                                    href={store.url}
                                    target="_blank"
                                    type="primary"
                                >{store.store.name}</Button>
                            })
                        }
                    </Panel>
                    <Panel header="Платформи на които можете да играете играта" key="6" className="site-collapse-custom-panel">
                        {   GamePlatforms &&
                            GamePlatforms.map((platform, index) => {
                                return <Button 
                                    key={index}
                                    style={{margin: '5px'}}
                                    href={platform.url}
                                    target="_blank"
                                    type="primary"
                                >{platform.platform.name}</Button>
                            })
                        }
                    </Panel>
                    <Panel header="Връзка към официалния сайт" key="7" className="site-collapse-custom-panel">
                        <Button
                            href={Game.website}
                            target="_blank"
                            type="primary"
                        >Официален сайт</Button>
                    </Panel>
                    <Panel header="Снимки от играта" key="8" className="site-collapse-custom-panel">
                        <Row gutter={[16, 16]}>
                        {   GameScreenshots &&
                            GameScreenshots.map((screenshot, index) => {
                                return <Col key={index} lg={6} md={8} xs={24}>
                                    <img
                                        style={{width: '100%', height: '400px'}}
                                        src={screenshot.image}
                                    />
                                </Col>
                            })
                        }
                        </Row>
                    </Panel>
                    <Panel header="Подобни игри" key="9" className="site-collapse-custom-panel">
                        <Row gutter={[16, 16]}>
                            {SimilarGames && SimilarGames.map((game, index) => (
                                <React.Fragment key={index}>
                                    <GameCard 
                                        image={game.background_image}
                                        gameId={game.id}
                                        name={game.name}
                                    />
                                </React.Fragment>
                            ))}
                        </Row>
                    </Panel>
                </Collapse>
                <YouTube
                    video={GameVideo.toString()}
                    width='100%'
                    height='300px'
                />
            </div>
        </div>
    );
}
 
export default GameDetailPage;