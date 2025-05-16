import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Select } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/mockAuthService';

const { Option } = Select;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await authService.register(values);
      console.log('Kayıt Yanıtı:', response); // API yanıtını logla
      message.success('Kayıt başarılı! Giriş yapabilirsiniz.');
      navigate('/login');
    } catch (error) {
      console.error('Kayıt Hatası Detay:', error);
      message.error(error.response?.data?.message || 'Kayıt başarısız!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-header">
          <h2>Hasta Kayıt</h2>
        </div>
        <Form
          name="register_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Lütfen adınızı giriniz!' }]}
            className="auth-form-item"
          >
            <Input prefix={<UserOutlined />} placeholder="Ad Soyad" size="large" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, type: 'email', message: 'Lütfen geçerli bir email adresi giriniz!' }
            ]}
            className="auth-form-item"
          >
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Lütfen şifrenizi giriniz!' }]}
            className="auth-form-item"
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Şifre" size="large" />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: 'Lütfen telefon numaranızı giriniz!' }]}
            className="auth-form-item"
          >
            <Input prefix={<PhoneOutlined />} placeholder="Telefon" size="large" />
          </Form.Item>
          <Form.Item
            name="gender"
            rules={[{ required: true, message: 'Lütfen cinsiyetinizi seçiniz!' }]}
            className="auth-form-item"
          >
            <Select placeholder="Cinsiyet" size="large">
              <Option value="male">Erkek</Option>
              <Option value="female">Kadın</Option>
              <Option value="other">Diğer</Option>
            </Select>
          </Form.Item>
          <Form.Item className="auth-form-item">
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading} 
              className="auth-form-button"
              size="large"
            >
              Kayıt Ol
            </Button>
          </Form.Item>
          <div className="auth-form-links">
            <a href="/login">Zaten hesabınız var mı? Giriş yapın</a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;