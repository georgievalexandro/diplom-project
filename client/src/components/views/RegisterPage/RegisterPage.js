import React from "react";
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";
import { Modal } from 'antd';

import {
  Form,
  Input,
  Button,
} from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (

    <Formik
      initialValues={{
        email: '',
        lastName: '',
        name: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('Моля въведете име'),
        lastName: Yup.string()
          .required('Моля въведете фамилия'),
        email: Yup.string()
          .email('Невалиден имейл адрес')
          .required('Моля въведете имейл'),
        password: Yup.string()
          .min(6, 'Минимум 6 символа')
          .required('Моля въведете парола'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Паролите не съвпадат')
          .required('Моля въведете повторно парола')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            lastname: values.lastname,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
          };

          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.success) {
              props.history.push("/login");
            } else {
              console.log(response.payload.err);
              Modal.info({
                title: 'Потребител с този имейл адрес вече съществува!',
                content: (
                  <div>
                    <p>Моля въведете различен имейл адрес.</p>
                  </div>
                ),
                onOk() {},
            });
            }
          })

          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="app">
            <div style={{
              boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 50px -30px',
              borderRadius: '5px',
              padding: '20px'
            }}>
              <h2 style={{textAlign: 'center'}}>Регистрация</h2>
              <Form labelAlign='left' style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >

                <Form.Item required label="Име">
                  <Input
                    id="name"
                    placeholder="Въведете име"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.name && touched.name ? 'text-input error' : 'text-input'
                    }
                  />
                  {errors.name && touched.name && (
                    <div className="input-feedback">{errors.name}</div>
                  )}
                </Form.Item>

                <Form.Item required label="Фамилия">
                  <Input
                    id="lastName"
                    placeholder="Въведете фамилия"
                    type="text"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.lastName && touched.lastName ? 'text-input error' : 'text-input'
                    }
                  />
                  {errors.lastName && touched.lastName && (
                    <div className="input-feedback">{errors.lastName}</div>
                  )}
                </Form.Item>

                <Form.Item required label="Имейл" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                  <Input
                    id="email"
                    placeholder="example@gmail.com"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email ? 'text-input error' : 'text-input'
                    }
                  />
                  {errors.email && touched.email && (
                    <div className="input-feedback">{errors.email}</div>
                  )}
                </Form.Item>

                <Form.Item required label="Парола" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                  <Input
                    id="password"
                    placeholder="Въведете парола"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password ? 'text-input error' : 'text-input'
                    }
                  />
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
                  )}
                </Form.Item>

                <Form.Item required label="Потвърди" hasFeedback>
                  <Input
                    id="confirmPassword"
                    placeholder="Въведете парола"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                    }
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="input-feedback">{errors.confirmPassword}</div>
                  )}
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Button onClick={handleSubmit} type="primary" block disabled={isSubmitting}>
                    Изпрати
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};


export default RegisterPage
