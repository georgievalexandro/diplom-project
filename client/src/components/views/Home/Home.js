import React from 'react';
import classes from './Home.module.css';
import gameVideo from '../../../assets/videos/game.mp4';
import movieVideo from '../../../assets/videos/movie.mp4';
import { Form, Input, InputNumber, Button } from 'antd';
import AnchorLink from 'react-anchor-link-smooth-scroll';


// const layout = {
//     labelCol: { span: 8 },
//     wrapperCol: { span: 16 },
// };


// const validateMessages = {
//     required: '${label} is required!',
//     types: {
//       email: '${label} is not validate email!',
//       number: '${label} is not a validate number!',
//     },
//     number: {
//       range: '${label} must be between ${min} and ${max}',
//     },
// };


const home = props => {
    // const onFinish = values => {
    //     console.log(values);
    // };
    
    return (
        <>
            <div className={classes.Section} id='sectionOne'>
                <video
                    loop
                    muted
                    autoPlay
                    preload='auto'>
                    <source src={gameVideo} type='video/mp4'/>
                </video>

                <div className={classes.SectionCaptions}>
                    <h1 className={classes.HomepageTitle}>Разбери всичко за любимата си игра</h1>
                    <Button href='games' ghost>Виж най-новите игри</Button>
                </div>

                <AnchorLink offset='70px' href="#sectionTwo" className={classes.ScrollLink}>
                    <span></span>
                    <span></span>
                    <span></span>
                </AnchorLink>
            </div>
            <div className={classes.Section} id='sectionTwo'>
                <video
                    loop
                    muted
                    autoPlay
                    preload='auto'>
                    <source src={movieVideo} type='video/mp4'/>
                </video>

                <div className={classes.SectionCaptions}>
                    <h1 className={classes.HomepageTitle}>Виж кога излизат най-новите филми</h1>
                    <Button href='movies' ghost>Виж най-новите филми</Button>
                </div>

                <AnchorLink offset='70px' href="#sectionThree" className={classes.ScrollLink}>
                    <span></span>
                    <span></span>
                    <span></span>
                </AnchorLink>
            </div>
            <div className={[classes.Section, classes.SectionThree].join(' ')} id='sectionThree'>
                <h3 style={{ textAlign: 'center', fontSize: '25px', fontWeight: '600'}}>Споделете вашето мнение, или предложение за развитието на сайта.</h3>

                <Form style={{ width: '20rem' }} name="nest-messages">
                    <Form.Item name={['user', 'name']} label="Име" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'email']} label="Имейл" rules={[{ type: 'email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'introduction']} label="Описание">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Изпрати
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default home;