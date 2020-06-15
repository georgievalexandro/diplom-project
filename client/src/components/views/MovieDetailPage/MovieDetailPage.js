import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_URL } from '../../Config';
import { Descriptions, Collapse, Tag, Row, Typography } from 'antd';
import YouTube from '@u-wave/react-youtube';

import MainImage from '../LandingPage/Sections/MainImage';
import GridCard from '../LandingPage/Sections/GridCard';
import Favorite from './Sections/Favorite';
import WatchLater from './Sections/WatchLater';

const { Panel } = Collapse;
const TAG_COLORS = {
    'Анимация': 'blue',
    'Семеен': 'yellow',
    'Приключение': 'green',
    'Комедия': 'orange',
    'Фентъзи': 'purple',
    'Екшън': 'red',
    'Романс': 'pink',
    default: 'black'
}

const { Title } = Typography;

function MovieDetailPage(props) {
    const [Movie, setMovie] = useState([]);
    const [MovieGenres, setMovieGenres] = useState(0);
    const [MovieVideo, setMovieVideo] = useState(0);
    const [SimilarMovie, setSimilarMovie] = useState(0);
    const [Cast, setCast] = useState(0);
    const movieId = props.match.params.movieId;

    useEffect(() => {
        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=bg&page=1`)
            .then(res => res.json())
            .then(res => {
                setMovie(res);
                setMovieGenres(res.genres);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        fetch(`${API_URL}movie/${movieId}/videos?api_key=${API_KEY}&page=1`)
            .then(res => res.json())
            .then(res => {
                setMovieVideo(res.results[0].key);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        
        fetch(`${API_URL}movie/${movieId}/similar?api_key=${API_KEY}&page=1`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                const data = res.results.slice(0, 5);
                setSimilarMovie(data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {

        fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(res => {
                setCast(res.cast);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            {Movie && 
                <MainImage image={`${IMAGE_URL}w1280${Movie.backdrop_path && Movie.backdrop_path}`} 
                    title={Movie.title || Movie.original_title}
                    text={Movie.overview}/>
            }

            <div style={{width: '85%', margin: '1rem auto'}}>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <WatchLater 
                        userFrom={localStorage.getItem('userId')}
                        movieId={movieId}
                        movieInfo={Movie}/>
                    <Favorite 
                        userFrom={localStorage.getItem('userId')}
                        movieId={movieId}
                        movieInfo={Movie}
                        movieGenres={MovieGenres}/>
                </div>
                <Collapse accordion defaultActiveKey={['1']}>
                    <Panel header="Допълнителна информация" key="1" className="site-collapse-custom-panel">
                    <Descriptions bordered layout='vertical' size='small' column={{lg: 2, md: 2, sm: 1, xs: 1}}>
                        <Descriptions.Item label="Наименование">{Movie.title}</Descriptions.Item>
                        <Descriptions.Item label="Наименование на английски">{Movie.original_title}</Descriptions.Item>
                        <Descriptions.Item label="Резюме" span={2}>{Movie.overview}</Descriptions.Item>
                        <Descriptions.Item label="Актьори" span={2}>
                            {Cast && Cast.map((actor, index) => {
                                return <Tag key={index} color='blue'>{actor.character}</Tag>
                            })}
                        </Descriptions.Item>
                        <Descriptions.Item label="Премиера">{Movie.release_date}</Descriptions.Item>
                        <Descriptions.Item label="Времетраене">{Movie.runtime} минути</Descriptions.Item>
                        {MovieGenres && 
                            <Descriptions.Item label="Жанрове">{MovieGenres.map((genre, index) => {
                                return <Tag 
                                    key={index}
                                    color={TAG_COLORS[genre.name] || TAG_COLORS['default']}>{genre.name}</Tag>
                            })}</Descriptions.Item>
                        }
                    </Descriptions>
                    </Panel>
                    <Panel header="Подобни филми" key="2" className="site-collapse-custom-panel">
                        <Row gutter={[16, 16]}>
                            {SimilarMovie && SimilarMovie.map((movie, index) => (
                                <React.Fragment key={index}>
                                    <GridCard 
                                        image={movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`}
                                        movieId={movie.id}
                                    />
                                </React.Fragment>
                            ))}
                        </Row>
                    </Panel>
                </Collapse>
                <br />
                <Title level={2}>Трейлър</Title>
                <br />
                <YouTube
                    video={MovieVideo.toString()}
                    width='100%'
                    height='300px'
                />

            </div>
        </div>
    );
}
 
export default MovieDetailPage;