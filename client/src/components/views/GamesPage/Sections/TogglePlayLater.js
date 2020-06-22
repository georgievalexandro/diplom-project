import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, notification } from 'antd';
import { PlayCircleFilled, PlayCircleOutlined } from '@ant-design/icons';

const TogglePlayLater = props => {
    const [Chosen, setChosenNumber] = useState(false);

    const variable = {
        userFrom: props.userFrom,
        gameId: props.gameId,
        gameTitle: props.gameInfo.name,
        gameImage: props.gameInfo.background_image,
        gameReleaseDate: props.gameInfo.released
    }

    useEffect(() => {
        axios.post('http://localhost:3000/api/playlater/chosedToPlayLater', variable)
        .then(response => {
            if(response.data.success){
                setChosenNumber(response.data.chosen);
            } else {
                console.log('Failed to get FavoriteNumber info');
            }
        })
    }, []);

    const chosenHandler = () => {
        if(Chosen) {
            axios.post('http://localhost:3000/api/playlater/removeFromPlayLater', variable)
                .then(response => {
                    if(response.data.success){
                        setChosenNumber(!Chosen);
                    } else {
                        alert('Failed to remove from playlater');
                    }
                })
        } else {
            const visitPlay = (<Button type='primary' href='/playlater-games' target='_blank'>Виж колекция</Button>);
            axios.post('http://localhost:3000/api/playlater/addToPlayLater', variable)
                .then(response => {
                    if(response.data.success){
                        setChosenNumber(!Chosen);
                        notification.open({
                            message: 'Успешно добавено за гледане по-късно',
                            description:
                               visitPlay,
                            onClick: () => {
                              console.log('Notification Clicked!');
                            },
                        });
                    } else {
                        Modal.info({
                            title: 'Моля влезте в профила си!',
                            content: (
                              <div>
                                <p>За да можете да добавяте игри в колекцията, <b><i>играй по-късно</i></b>, трябва да влезете в профила си или да се регистрирате ако нямате такъв.</p>
                              </div>
                            ),
                            onOk() {},
                        });
                    }
                })
        }
    }

    return (
        <Button onClick={chosenHandler} style={{borderRadius: 0}}>
            {Chosen ? 
                (<>Премахни <PlayCircleFilled style={{color: 'blue'}}/></>):
                (<>Играй по-късно <PlayCircleOutlined style={{color: 'blue'}}/></>)}
        </Button>
    )
}

export default TogglePlayLater;