import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { CalendarOutlined, UserOutlined, MedicineBoxOutlined } from '@ant-design/icons';

const Dashboard = () => {
  return (
    <div>
      <h2>Hoş Geldiniz</h2>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Aktif Randevular"
              value={3}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Doktorlar"
              value={105}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Bölümler"
              value={35}
              prefix={<MedicineBoxOutlined />}
            />
          </Card>
        </Col>
      </Row>
      
      {/* Son randevular */}
      <Card title="Son Randevular" style={{ marginBottom: 24 }}>
        {/* Randevu listesi buraya gelecek */}  

      </Card>
      {/* Son yorumlar */}
      <Card title="Son Yorumlar" style={{ marginBottom: 24 }}>
        {/* Yorum listesi buraya gelecek */}
         
      </Card>
      {/* Son haberler */}
      <Card title="Son Haberler" style={{ marginBottom: 24 }}>
        {/* Haber listesi buraya gelecek */}  
      </Card>

    
    </div>
  );
};

export default Dashboard;