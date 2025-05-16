import React from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  CalendarOutlined,
  UserOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const AppSidebar = () => {
  const items = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: <Link to="/dashboard">Ana Sayfa</Link>,
    },
    {
      key: '2',
      icon: <CalendarOutlined />,
      label: <Link to="/appointments">Randevularım</Link>,
    },
    {
      key: '3',
      icon: <TeamOutlined />,
      label: <Link to="/doctors">Doktorlar</Link>,
    },
    {
      key: '4',
      icon: <UserOutlined />,
      label: <Link to="/profile">Profilim</Link>,
    },
  ];

  return (
    <Sider width={250} style={{ background: '#fff' }}>
      <div style={{ 
        height: '64px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <h2 style={{ color: '#1890ff', margin: 0 }}>Hastane Randevu</h2>
      </div>
      <Menu 
        theme="light"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}
        style={{ borderRight: 0 }}
      />
    </Sider>
  );
};

export default AppSidebar;