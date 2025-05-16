import React from 'react';
import { Layout, Dropdown, Avatar, Badge, Space } from 'antd';
import { 
  BellOutlined, 
  UserOutlined, 
  LogoutOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const items = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profil',
      onClick: () => navigate('/profile')
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Çıkış Yap',
      onClick: handleLogout
    }
  ];

  return (
    <Header style={{ 
      background: '#fff', 
      padding: '0 24px',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)'
    }}>
      <Space size="large">
        <Badge count={5} size="small">
          <BellOutlined style={{ fontSize: 18, cursor: 'pointer' }} />
        </Badge>
        
        <Dropdown menu={{ items }} trigger={['click']}>
          <Space style={{ cursor: 'pointer' }}>
            <Avatar 
              size="default" 
              icon={<UserOutlined />} 
              src={user?.avatar}
              style={{ backgroundColor: '#1890ff' }}
            />
            <span style={{ fontWeight: 500 }}>{user?.name}</span>
          </Space>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default AppHeader;