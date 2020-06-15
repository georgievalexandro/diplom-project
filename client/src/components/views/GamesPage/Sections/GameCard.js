import React from 'react';
import { Col, Button } from 'antd';
import classes from './GameCard.module.css';

const gameCard = props => {
    return (
        <Col lg={6} md={8} xs={24} className={classes.GridCard}>
            <div style={{position:'relative'}}>
                <a href={`/game/${props.gameId}`}>
                    <img style={{width:'100%', height: '450px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}} alt='img' src={props.image}/>
                    <Button block className={classes.Name}>
                        {props.name}
                    </Button>
                </a>
            </div>
        </Col>
    );
}

export default gameCard;