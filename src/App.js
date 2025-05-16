import React from 'react';
import AppRoutes from './routes';
import { Layout } from 'antd';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import './App.css'; // App.css dosyasını ekleyin

const { Content } = Layout;

function App() {
  return (
    <Layout className="app-container">
      <Sidebar className="app-sidebar" />
      <Layout>
        <Header className="app-header" />
        <Content className="app-content">
          <AppRoutes />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;