import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Avatar, 
  Form, 
  Input, 
  Button, 
  Tabs, 
  Descriptions, 
  Tag,
  Upload,
  message,
  Skeleton
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined,
  EditOutlined,
  CameraOutlined
} from '@ant-design/icons';
import authService from '../services/authService';

const { TabPane } = Tabs;
const { TextArea } = Input;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
    form.setFieldsValue({
      name: userData?.name,
      email: userData?.email,
      phone: userData?.phone,
      address: userData?.address,
      bio: userData?.bio
    });
    setLoading(false);
  };

  const handleSubmit = async (values) => {
    try {
      // Burada API'ye güncelleme isteği gönderilebilir
      const updatedUser = { ...user, ...values };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      message.success('Profil bilgileri güncellendi');
    } catch (error) {
      message.error('Güncelleme sırasında hata oluştu');
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Sadece JPG/PNG dosyası yükleyebilirsiniz!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Resim 2MB\'den küçük olmalı!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleUpload = (info) => {
    if (info.file.status === 'done') {
      // Burada resim yükleme işlemi yapılabilir
      message.success(`${info.file.name} dosyası yüklendi`);
      const newUser = { ...user, avatar: URL.createObjectURL(info.file.originFileObj) };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} dosyası yüklenemedi`);
    }
  };

  if (loading || !user) {
    return <Skeleton active />;
  }

  return (
    <Card>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profil Bilgileri" key="1">
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Upload
              name="avatar"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleUpload}
              customRequest={({ file, onSuccess }) => {
                setTimeout(() => {
                  onSuccess("ok");
                }, 0);
              }}
            >
              <Avatar
                size={128}
                icon={<UserOutlined />}
                src={user.avatar}
                style={{ cursor: 'pointer' }}
              />
              <div style={{ marginTop: 10 }}>
                <Button icon={<CameraOutlined />}>Fotoğraf Değiştir</Button>
              </div>
            </Upload>
          </div>
          
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Ad Soyad">{user.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
            <Descriptions.Item label="Telefon">{user.phone || '-'}</Descriptions.Item>
            <Descriptions.Item label="Cinsiyet">
              <Tag color={user.gender === 'male' ? 'blue' : 'pink'}>
                {user.gender === 'male' ? 'Erkek' : 'Kadın'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Adres">{user.address || '-'}</Descriptions.Item>
          </Descriptions>
        </TabPane>
        
        <TabPane tab="Bilgileri Düzenle" key="2">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              name="name"
              label="Ad Soyad"
              rules={[{ required: true, message: 'Lütfen adınızı giriniz!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Ad Soyad" />
            </Form.Item>
            
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Lütfen email adresinizi giriniz!' },
                { type: 'email', message: 'Geçerli bir email adresi giriniz!' }
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" disabled />
            </Form.Item>
            
            <Form.Item
              name="phone"
              label="Telefon"
              rules={[
                { required: true, message: 'Lütfen telefon numaranızı giriniz!' }
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Telefon" />
            </Form.Item>
            
            <Form.Item
              name="address"
              label="Adres"
            >
              <Input placeholder="Adres" />
            </Form.Item>
            
            <Form.Item
              name="bio"
              label="Hakkımda"
            >
              <TextArea rows={4} placeholder="Kendiniz hakkında bilgi verin..." />
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<EditOutlined />}>
                Bilgileri Güncelle
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        
        <TabPane tab="Güvenlik" key="3">
          <PasswordChangeForm />
        </TabPane>
      </Tabs>
    </Card>
  );
};

const PasswordChangeForm = () => {
  const [loading, setLoading] = useState(false);
  
  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Şifre değiştirme API isteği
      message.success('Şifre başarıyla değiştirildi');
    } catch (error) {
      message.error('Şifre değiştirilirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 500 }}
    >
      <Form.Item
        name="currentPassword"
        label="Mevcut Şifre"
        rules={[{ required: true, message: 'Lütfen mevcut şifrenizi giriniz!' }]}
      >
        <Input.Password placeholder="Mevcut şifre" />
      </Form.Item>
      
      <Form.Item
        name="newPassword"
        label="Yeni Şifre"
        rules={[{ required: true, message: 'Lütfen yeni şifrenizi giriniz!' }]}
      >
        <Input.Password placeholder="Yeni şifre" />
      </Form.Item>
      
      <Form.Item
        name="confirmPassword"
        label="Yeni Şifre Tekrar"
        dependencies={['newPassword']}
        rules={[
          { required: true, message: 'Lütfen şifreyi tekrar giriniz!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Girdiğiniz şifreler eşleşmiyor!'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Yeni şifre tekrar" />
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Şifreyi Değiştir
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Profile;