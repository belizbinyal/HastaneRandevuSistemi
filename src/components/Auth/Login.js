import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/mockAuthService';
import './Auth.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await authService.login(values);
      console.log('Login Response:', response);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      message.success('Giriş başarılı! Yönlendiriliyorsunuz...');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login Error:', error);
      message.error(error.response?.data?.message || 'Email veya şifre hatalı!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-header">
          <h2>Hasta Girişi</h2>
          <p>Lütfen hesap bilgilerinizi giriniz</p>
        </div>
        
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              { 
                required: true, 
                message: 'Lütfen email adresinizi giriniz!' 
              },
              {
                type: 'email',
                message: 'Geçerli bir email adresi giriniz!'
              }
            ]}
            className="auth-form-item"
          >
            <Input 
              prefix={<UserOutlined className="site-form-item-icon" />} 
              placeholder="Email" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { 
                required: true, 
                message: 'Lütfen şifrenizi giriniz!' 
              },
              {
                min: 6,
                message: 'Şifreniz en az 6 karakter olmalıdır!'
              }
            ]}
            className="auth-form-item"
          >
            <Input.Password 
              prefix={<LockOutlined className="site-form-item-icon" />} 
              placeholder="Şifre" 
              size="large"
            />
          </Form.Item>

          <Form.Item className="auth-form-item">
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading} 
              className="auth-form-button"
              size="large"
            >
              Giriş Yap
            </Button>
          </Form.Item>

          <div className="auth-form-links">
            <a href="/register" className="auth-form-link">
              Hesabınız yok mu? Kayıt olun
            </a>
            <a href="/forgot-password" className="auth-form-link">
              Şifrenizi mi unuttunuz?
            </a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;