import React, { useState } from 'react';
import classes from './Home.module.css';
import gameVideo from '../../../assets/videos/game.mp4';
import movieVideo from '../../../assets/videos/movie.mp4';
import { Button, Select, Input } from 'antd';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { useSelector } from "react-redux";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { USER_SERVER } from '../../Config';

const { TextArea } = Input;
const { Option } = Select;

const OpinionSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, '*Въведете поне 2 символа')
      .max(20, '*Името е прекалено дълго')
      .required('*Моля въведете име'),
    lastName: Yup.string()
      .min(2, '*Въведете поне 2 символа')
      .max(20, '*Фамилията е прекалено дълга')
      .required('*Моля въведете фамилия'),
    email: Yup.string()
      .email('*Моля въведете валиден имейл адрес')
      .required('*Моля въведете имейл'),
  });

const Home = props => {
    const user = useSelector(state => state.user);
    const [SelectState, setSelectState] = useState(null);
    const [OpinionData, setOpinionData] = useState(null);
    const [DeleteAccountMessage, setDeleteAccountMessage] = useState(null);
    const userId = localStorage.getItem('userId');


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
                    validationSchema={OpinionSchema}
                    onSubmit={values => {
                        // same shape as initial values
                        setOpinionData(values);
                        const variable = {
                            firstName: values.firstName,
                            lastName: values.lastName,
                            email: values.email,
                            message: values.message
                        }
                        axios.post('http://localhost:3000/api/useropinion/addOpinion', variable)
                        .then(response => {
                            console.log('Mail was sent');
                        })
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className={classes.OpinionForm}>
                            <Field name="firstName" className={classes.CustomInput} placeholder="Име"/>
                            {errors.firstName && touched.firstName ? (
                                <div style={{color: '#d74747', fontWeight: '500'}}>{errors.firstName}</div>
                            ) : null}

                            <Field name="lastName" className={classes.CustomInput} placeholder="Фамилия"/>
                            {errors.lastName && touched.lastName ? (
                                <div style={{color: '#d74747', fontWeight: '500'}}>{errors.lastName}</div>
                            ) : null}

                            <Field name="email" type="email" className={classes.CustomInput} placeholder="Имейл"/>
                            {errors.email && touched.email ? <div style={{color: '#d74747', fontWeight: '500'}}>{errors.email}</div> : null}

                            <Field name="message" component="textarea" className={classes.CustomTextarea} placeholder="Споделете с нас"/>
                            
                            <button type="submit" className={classes.CustomSubmitButton}>Изпрати</button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }else if(SelectState === 'deleteAccount') {
        form = (
            <div className={classes.DeleteAccountFormContainer}>
        	    <h1 style={{margin: '30px 0 0 0'}}>Съжаляваме че ни напускате :(</h1>
                <Formik
                    initialValues={{
                        message: ''
                    }}
                    onSubmit={values => {
                        setDeleteAccountMessage(values.message);
                        const variable = {
                            userEmail: user.userData.email,
                            userMessage: values.message || 'Няма съобщение'
                        }
                        // same shape as initial values
                        
                        axios.post('http://localhost:3000/api/sendmail/sendNotification', variable)
                        .then(response => {
                            console.log('Mail was sent');
                        })
                        // axios.post('http://localhost:3000/api/users/deleteAccount', {userId})
                        // .then(response => {
                        //     if(response.data.success){
                        //         axios.get(`${USER_SERVER}/logout`).then(response => {
                        //             if (response.status === 200) {
                        //               props.history.push("/login");
                        //             } else {
                        //               alert('Log Out Failed')
                        //             }
                        //         });
                        //     }else {
                        //         alert('Failed to delete account');
                        //     }
                        // })
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className={classes.OpinionForm}>
                            <Field name="message" component="textarea" className={classes.CustomTextarea} placeholder="Споделете защо избирате да изтриете акаунта си"/>
                            <button type="submit" className={classes.CustomSubmitButton}>Изтрий акаунт</button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }

    function onChange(value) {
        setSelectState(value);
    } 
    
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