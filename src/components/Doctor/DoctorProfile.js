import React, { useState, useEffect, useCallback } from 'react';
import { 
  Card, 
  Avatar, 
  Row, 
  Col, 
  Divider, 
  Tabs, 
  Tag, 
  Button, 
  List, 
  Rate,
  Descriptions,
  Skeleton,
  Modal
} from 'antd';
import { 
  UserOutlined, 
  CalendarOutlined, 
  MedicineBoxOutlined,
  //StarOutlined,
  //ClockCircleOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined
} from '@ant-design/icons';
import appointmentService from '../../services/appointmentService';
import AppointmentForm from '../Appointment/AppointmentForm';
//import { useParams } from 'react-router-dom';
const { TabPane } = Tabs;
//const { Meta } = Card;

const DoctorProfile = ({ match }) => {
  // const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  const fetchDoctor = useCallback(async () => {
    try {
      const response = await appointmentService.getDoctorById(match.params.id);
      setDoctor(response.data);
    } catch (error) {
      console.error('Doktor bilgileri yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  }, [match.params.id]);

  const fetchDoctorAppointments = useCallback(async () => {
    try {
      const response = await appointmentService.getDoctorAppointments(match.params.id);
      setAppointments(response.data);
    } catch (error) {
      console.error('Randevular yüklenirken hata:', error);
    }
  }, [match.params.id]);

  useEffect(() => {
    fetchDoctor();
    fetchDoctorAppointments();
  }, [fetchDoctor, fetchDoctorAppointments]);

  const handleAppointmentSubmit = async (values) => {
    try {
      await appointmentService.createAppointment({
        ...values,
        doctorId: match.params.id
      });
      setShowAppointmentForm(false);
      fetchDoctorAppointments();
    } catch (error) {
      console.error('Randevu oluşturulurken hata:', error);
    }
  };

  if (loading || !doctor) {
    return <Skeleton active />;
  }

  return (
    <div>
      <Card>
        <Row gutter={24}>
          <Col xs={24} sm={8} md={6}>
            <Avatar 
              size={160} 
              icon={<UserOutlined />} 
              src={doctor.image} 
              style={{ width: '100%', height: 'auto' }}
            />
            <Divider />
            <Button 
              type="primary" 
              block
              onClick={() => setShowAppointmentForm(true)}
            >
              Randevu Al
            </Button>
          </Col>
          <Col xs={24} sm={16} md={18}>
            <h1>{doctor.name}</h1>
            <Tag color="blue" style={{ fontSize: 16 }}>
              <MedicineBoxOutlined /> {doctor.specialization}
            </Tag>
            
            <Rate 
              disabled 
              defaultValue={doctor.rating || 4.5} 
              style={{ marginLeft: 10 }} 
            />
            
            <Divider />
            
            <Descriptions column={1}>
              <Descriptions.Item label="Deneyim">
                <Tag color="purple">{doctor.experience} yıl</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Çalıştığı Hastane">
                <Tag icon={<EnvironmentOutlined />}>{doctor.hospital}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="İletişim">
                <div>
                  <p><PhoneOutlined /> {doctor.phone}</p>
                  <p><MailOutlined /> {doctor.email}</p>
                </div>
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        
        <Divider />
        
        <Tabs defaultActiveKey="1">
          <TabPane tab="Hakkında" key="1">
            <h3>Uzmanlık Alanları</h3>
            <div>
              {doctor.specialties?.map(spec => (
                <Tag key={spec} color="cyan">{spec}</Tag>
              ))}
            </div>
            
            <h3 style={{ marginTop: 20 }}>Biyografi</h3>
            <p>{doctor.bio || 'Doktor biyografisi bulunmamaktadır.'}</p>
          </TabPane>
          
          <TabPane tab="Randevular" key="2">
            <List
              dataSource={appointments}
              renderItem={app => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<CalendarOutlined style={{ fontSize: 24 }} />}
                    title={`${app.date} - ${app.time}`}
                    description={
                      <div>
                        <Tag color={app.status === 'confirmed' ? 'green' : 'orange'}>
                          {app.status === 'confirmed' ? 'Onaylandı' : 'Beklemede'}
                        </Tag>
                        <span style={{ marginLeft: 10 }}>{app.notes}</span>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </TabPane>
          
          <TabPane tab="Yorumlar" key="3">
            <List
              dataSource={doctor.reviews || []}
              renderItem={review => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={review.userAvatar} />}
                    title={
                      <div>
                        <Rate disabled defaultValue={review.rating} />
                        <span style={{ marginLeft: 10 }}>{review.userName}</span>
                      </div>
                    }
                    description={review.comment}
                  />
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </Card>

      <Modal
        title={`${doctor.name} için Randevu Al`}
        open={showAppointmentForm}
        onCancel={() => setShowAppointmentForm(false)}
        footer={null}
        width={800}
      >
        <AppointmentForm 
          doctor={doctor} 
          onSubmit={handleAppointmentSubmit} 
        />
      </Modal>
    </div>
  );
};

export default DoctorProfile;