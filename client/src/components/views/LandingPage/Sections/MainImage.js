import React from 'react';
import classes from '../LandingPage.module.css';
import { Typography } from 'antd';
const { Title } = Typography;

const mainImage = props => {
    return (
        <div className={classes.ImageContainer} style={{backgroundImage: `url('${props.image}')`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', backgroundPosition: 'center center'}}>
            <div>
                <div style={{position:'absolute', maxWidth: '500px', bottom: '2rem', marginLeft: '2rem'}}>
                    <Title style={{color: 'white'}} level={2}>{props.title || null}</Title>
                </div>
            </div>
        </div>
    );
}

export default mainImage;