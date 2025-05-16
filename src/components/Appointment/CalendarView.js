import React, { useState, useEffect } from 'react';
import { Calendar, Badge, Modal, List, Tag, Button, Spin } from 'antd';
import { ClockCircleOutlined, CloseOutlined } from '@ant-design/icons';
import moment from 'moment';
import appointmentService from '../../services/appointmentService';

const CalendarView = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cancelLoadingId, setCancelLoadingId] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await appointmentService.getAppointments();
      setAppointments(response.data);
    } catch (error) {
      console.error('Randevular yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const dateCellRender = (value) => {
    const dayAppointments = appointments.filter(app => 
      moment(app.date).isSame(value, 'day')
    );
    
    return (
      <div className="events">
        {dayAppointments.slice(0, 2).map(app => (
          <Badge 
            key={app.id}
            status={app.status === 'confirmed' ? 'success' : 'warning'}
            text={`${app.time} - ${app.doctor.name}`}
          />
        ))}
        {dayAppointments.length > 2 && (
          <Badge status="default" text={`+${dayAppointments.length - 2} more`} />
        )}
      </div>
    );
  };

  const handleSelect = (value) => {
    setSelectedDate(value);
    const hasAppointments = appointments.some(app => 
      moment(app.date).isSame(value, 'day')
    );
    if (hasAppointments) setVisible(true);
  };

  const getDayAppointments = () => {
    return appointments.filter(app => 
      moment(app.date).isSame(selectedDate, 'day')
    ).sort((a, b) => a.time.localeCompare(b.time));
  };

  
  const handleCancel = async (appointmentId) => {
    setCancelLoadingId(appointmentId);
    try {
      await appointmentService.cancelAppointment(appointmentId);
      await fetchAppointments();
      setVisible(false);
    } catch (error) {
      console.error('Randevu iptal edilirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Spin spinning={loading} tip="Randevular yükleniyor..." />
      <div>
        <Calendar 
          dateCellRender={dateCellRender} 
          onSelect={handleSelect}
          style={{ background: '#fff', padding: 20, borderRadius: 8 }}
        />
        
        <Modal
          title={`${selectedDate.format('DD MMMM YYYY')} Randevuları`}
          open={visible}
          onCancel={() => setVisible(false)}
          footer={null}
          width={600}
        >
          <List
            itemLayout="horizontal"
            dataSource={getDayAppointments()}
            renderItem={appointment => (
              <List.Item
                actions={[
                  <Button 
                    type="link" 
                    icon={<CloseOutlined />} 
                    onClick={() => handleCancel(appointment.id)}
                    loading={cancelLoadingId === appointment.id}
                    disabled={appointment.status === 'cancelled'}
                  >
                    {cancelLoadingId !== appointment.id && 'İptal'}
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={<ClockCircleOutlined style={{ fontSize: 20 }} />}
                  title={
                    <span>
                      {appointment.time} - {appointment.doctor.name}
                      <Tag 
                        color={
                          appointment.status === 'confirmed' ? 'green' : 
                          appointment.status === 'cancelled' ? 'red' : 'orange'
                        }
                        style={{ marginLeft: 10 }}
                      >
                        {appointment.status === 'confirmed' ? 'Onaylandı' : 
                        appointment.status === 'cancelled' ? 'İptal Edildi' : 'Beklemede'}
                      </Tag>
                    </span>
                  }
                  description={appointment.notes || 'Not bulunmamaktadır'}
                />
              </List.Item>
            )}
          />
        </Modal>
      </div>
    </>
  );
};

export default CalendarView;