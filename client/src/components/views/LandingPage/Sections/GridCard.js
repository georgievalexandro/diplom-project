import React from 'react';
import { Col } from 'antd';
import classes from './GridCard.module.css';

const gridCard = props => {
    return (
        <Col lg={6} md={8} xs={24} className={classes.GridCard}>
            <div style={{position:'relative'}}>
                <a href={`/movie/${props.movieId}`}>
                    <img style={{width:'100%', height: '450px', borderRadius: '10px'}} alt='img' src={props.image}/>
                </a>
            </div>
        </Col>
    );
}

export default gridCard;