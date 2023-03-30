import React, {useEffect} from 'react';
import {connect} from 'dva';
import styles from './IndexPage.less';
import people from '../assets/img2.png'
import sphere from '../assets/img1.png'
import {Form, Icon, Input, Button, Checkbox} from 'antd';


function IndexPage(props) {

  useEffect(()=>{
    document.querySelector("#people").addEventListener('animationend', function () {
      document.querySelector("#people").classList.remove(styles.p_animtion);
      document.querySelector("#people").classList.add(styles.p_other_animtion)
    });
    document.querySelector("#sphere").addEventListener('animationend', function () {
      document.querySelector("#sphere").classList.remove(styles.s_animtion);
      document.querySelector("#sphere").classList.add(styles.s_other_animtion)
    });
  }, []);


  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  const {getFieldDecorator} = props.form;
  return (
    <div className={styles.normal}>
      <div className={styles.content}>
        <div className={styles.left}>
          <img src={people} id="people" className={styles.people} alt="people"/>
          <img src={sphere} id="sphere" className={styles.sphere} alt="sphere"/>
        </div>
        <div className={styles.right}>
          <Form onSubmit={handleSubmit} className={styles.login_form}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <a className={styles.login_form_forgot} href="">
                Forgot password
              </a>
              <Button type="primary" htmlType="submit" className={styles.login_form_button}>
                Log in
              </Button>
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

IndexPage.propTypes = {};

export default connect()(Form.create({name: 'normal_login'})(IndexPage));
