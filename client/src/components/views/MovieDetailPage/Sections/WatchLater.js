import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'antd';
import { PlayCircleFilled, PlayCircleOutlined } from '@ant-design/icons';

const WatchLater = props => {
    const [WatchLaterNumber, setWatchLaterNumber] = useState(0);
    const [ToWatchLater, setToWatchLaterNumber] = useState(false);
    const variable = {
        userFrom: props.userFrom,
        movieId: props.movieId,
        movieTitle: props.movieInfo.title || props.movieInfo.original_title,
        movieImage: props.movieInfo.backdrop_path,
        movieRunTime: props.movieInfo.runtime,
        movieReleaseDate: props.movieInfo.release_date
    }
    
    useEffect(() => {

        axios.post('http://localhost:3000/api/watchlater/watchLaterNumber', variable)
            .then(response => {
                if(response.data.success){
                    setWatchLaterNumber(response.data.watchLaterNumber);
                } else {
                    console.log('Failed to get watchLaterNumber');
                }
            })

        axios.post('http://localhost:3000/api/watchlater/towatchlater', variable)
        .then(response => {
            if(response.data.success){
                setWatchLaterNumber(response.data.towatchlater);
            } else {
                console.log('Failed to get FavoriteNumber info');
            }
        })
    }, [])

    const watchLaterHandler = () => {
        if(ToWatchLater) {
            axios.post('http://localhost:3000/api/watchlater/removeFromWatchLater', variable)
                .then(response => {
                    if(response.data.success){
                        setWatchLaterNumber(WatchLaterNumber - 1);
                        setToWatchLaterNumber(!ToWatchLater);
                    } else {
                        console.log('Failed to remove from favorites');
                    }
                })
        } else {
            axios.post('http://localhost:3000/api/watchlater/addToWatchLater', variable)
                .then(response => {
                    if(response.data.success){
                        setWatchLaterNumber(WatchLaterNumber + 1);
                        setToWatchLaterNumber(!ToWatchLater);
                    } else {
                        Modal.info({
                            title: 'Моля влезте в профила си!',
                            content: (
                              <div>
                                <p>За да можете да добавяте филми в колекцията, <b><i>за гледане по-късно</i></b>, трябва да влезете в профила си или да се регистрирате ако нямате такъв.</p>
                              </div>
                            ),
                            onOk() {},
                        });
                    }
                })
        }
    }

    return (
        <Button onClick={watchLaterHandler} style={{margin: '5px'}}>
            {ToWatchLater ? 
                (<>Премахни <PlayCircleFilled style={{color: 'blue'}}/></>):
                (<>Добави за гледане по-късно <PlayCircleOutlined style={{color: 'blue'}}/></>)}
        </Button>
    );
}

export default WatchLater;