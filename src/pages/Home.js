import React from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Carousel, 
  Button, 
  Typography, 
  Divider,
  List 
} from 'antd';
import { 
  CalendarOutlined, 
  TeamOutlined, 
  MedicineBoxOutlined,
  ClockCircleOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Meta } = Card;

const Home = () => {
  const features = [
    {
      title: 'Online Randevu',
      icon: <CalendarOutlined style={{ fontSize: 36 }} />,
      description: 'Dilediğiniz doktordan kolayca randevu alın'
    },
    {
      title: 'Uzman Doktorlar',
      icon: <TeamOutlined style={{ fontSize: 36 }} />,
      description: 'Alanında uzman doktor kadromuz'
    },
    {
      title: 'Çoklu Branş',
      icon: <MedicineBoxOutlined style={{ fontSize: 36 }} />,
      description: '20+ farklı tıbbi branş seçeneği'
    },
    {
      title: 'Hızlı Hizmet',
      icon: <ClockCircleOutlined style={{ fontSize: 36 }} />,
      description: 'Hızlı ve güvenilir sağlık hizmeti'
    }
  ];

  const testimonials = [
    {
      name: 'Ahmet Yılmaz',
      comment: 'Çok kolay randevu alabildim, doktorum çok ilgiliydi.'
    },
    {
      name: 'Ayşe Demir',
      comment: 'Online sistem sayesinde hastanede beklemeden muayene oldum.'
    },
    {
      name: 'Mehmet Kaya',
      comment: 'Doktor seçenekleri çok fazla, memnun kaldım.'
    }
  ];

  return (
    <div>
      <Carousel autoplay>
        <div>
          <div style={{
            background: '#1890ff',
            color: '#fff',
            height: '300px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}>
            <Title level={2} style={{ color: '#fff' }}>Sağlığınız Bizim İçin Önemli</Title>
            <Paragraph style={{ color: '#fff', fontSize: '18px' }}>
              Uzman doktor kadromuzla hizmetinizdeyiz
            </Paragraph>
            <Button type="primary" size="large">
              Hemen Randevu Al <ArrowRightOutlined />
            </Button>
          </div>
        </div>
        <div>
          <div style={{
            background: '#52c41a',
            color: '#fff',
            height: '300px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}>
            <Title level={2} style={{ color: '#fff' }}>Online Muayene</Title>
            <Paragraph style={{ color: '#fff', fontSize: '18px' }}>
              Evinizin konforunda doktorunuzla görüşün
            </Paragraph>
          </div>
        </div>
      </Carousel>

      <Divider orientation="left">Neden Biz?</Divider>
      
      <Row gutter={16} style={{ marginBottom: 30 }}>
        {features.map((feature, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card hoverable style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: 20 }}>{feature.icon}</div>
              <Title level={4}>{feature.title}</Title>
              <Paragraph>{feature.description}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>

      <Divider orientation="left">Hastalarımız Ne Diyor?</Divider>
      
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={testimonials}
        renderItem={item => (
          <List.Item>
            <Card>
              <Meta
                title={item.name}
                description={item.comment}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Home;