import React, { useState } from 'react';
import classes from './Home.module.css';
import gameVideo from '../../../assets/videos/game.mp4';
import movieVideo from '../../../assets/videos/movie.mp4';
import { Button, Select, Input } from 'antd';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { useSelector } from "react-redux";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const { TextArea } = Input;
const { Option } = Select;

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
  });

const Home = props => {
    const user = useSelector(state => state.user);
    const [SelectState, setSelectState] = useState(null);
    const [OpinionData, setOpinionData] = useState(null);
    
    if(user.userData && user.userData.isAuth) {
        console.log('Is logged in');
    } else {
        console.log('Not logged in');
    }

    let form = null;
    if(SelectState === 'opinion') {
        form = (
            <div className={classes.OpinionFormContainer}>
        	    <h1>Споделете мнението си с нас</h1>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        message: ''
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        // same shape as initial values
                        setOpinionData(values);
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className={classes.OpinionForm}>
                            <Field name="firstName" />
                            {errors.firstName && touched.firstName ? (
                                <div>{errors.firstName}</div>
                            ) : null}

                            <Field name="lastName" />
                            {errors.lastName && touched.lastName ? (
                                <div>{errors.lastName}</div>
                            ) : null}

                            <Field name="email" type="email" />
                            {errors.email && touched.email ? <div>{errors.email}</div> : null}

                            <Field name="message" as='textarea' />
                            {errors.message && touched.message ? <div>{errors.message}</div> : null}
                            
                            <button type="submit">Submit</button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }else if(SelectState === 'deleteAccount') {
        form = (<h3>Изтриване на акаунт</h3>);
    }

    function onChange(value) {
        setSelectState(value);
    } 
    console.log(OpinionData);
    
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
                <h3 style={{ textAlign: 'center', fontSize: '25px', fontWeight: '600'}}>Свържете се с нас</h3>
                <Select
                    className={classes.SelectSize}
                    allowClear
                    showSearch
                    size='large'
                    style={{ width: 200 }}
                    placeholder="Избери типа на съобщението"
                    optionFilterProp="children"
                    onChange={onChange}
                >
                    <Option value="opinion">Сподели мнение</Option>
                    <Option value="deleteAccount" disabled={!(user.userData && user.userData.isAuth)}>Поискай изтриване на акаунт</Option>
                </Select>
                
                {form}
            </div>
        </>
    )
}

export default Home;