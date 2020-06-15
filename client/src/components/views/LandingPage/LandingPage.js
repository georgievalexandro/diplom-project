import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config';
import classes from './LandingPage.module.css';
import { Typography, Row, Button, Breadcrumb } from 'antd';
import MainImage from './Sections/MainImage';
import GridCard from './Sections/GridCard';
import moment from 'moment';

const { Title } = Typography;

function LandingPage() {
    let currentDate = moment().format("YYYY-MM-DD");
    let monthLater = moment().add({months: 1}).format("YYYY-MM-DD");

    const [Movies, setMovies] = useState([]);
    const [CurrentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const endpoint = `${API_URL}movie/upcoming?api_key=${API_KEY}&language=bg&page=1&primary_release_date.gte=${currentDate}&primary_release_date.lte=${monthLater}`;
        fetchMovies(endpoint);
    }, []);

    const fetchMovies = (path) => {
        fetch(path)
            .then(res => res.json())
            .then(res => {
                setMovies([...Movies, ...res.results]);
                setCurrentPage(res.page);
                console.log(res.results);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const loadMore = () => {
        let endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=bg&page=${CurrentPage + 1}`;

        fetchMovies(endpoint);
    }

    return (
        <div className={classes.Container}>
            {Movies[0] && 
                <MainImage image={`${IMAGE_URL}w1280${Movies[0].backdrop_path && Movies[0].backdrop_path}`} 
                    title={Movies[0].title || Movies[0].original_title}/>
            }

            {/* Body */}
            <div style={{width: '85%', margin: '1rem auto'}}>
                <Breadcrumb separator=">" style={{textAlign: 'center', marginBottom: '50px'}}>
                    <Breadcrumb.Item href="/">Начална страница</Breadcrumb.Item>
                    <Breadcrumb.Item href="/movies">Филми</Breadcrumb.Item>
                </Breadcrumb>
                <Title level={2}>Популярни и предстоящи филми</Title>
                {/* Grid card */}
                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCard 
                                image={movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`}
                                movieId={movie.id}
                            />
                        </React.Fragment>
                    ))}
                </Row>

                {/* Load More Button */}
                <br />
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button type='ghost' size='large' onClick={loadMore}>Виж повече</Button>
                </div>
            </div>

        </div>
    )
}

export default LandingPage
