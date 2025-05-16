import React, { useState, useEffect } from 'react';
import { Button, Table, Tag, Space, Modal,  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AppointmentForm from '../components/Appointment/AppointmentForm';
import appointmentService from '../services/appointmentService';


const { Column } = Table;


const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const data = await appointmentService.getAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Randevular yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const data = await appointmentService.getDoctors();
      setDoctors(data);
    } catch (error) {
      console.error('Doktorlar yüklenirken hata:', error);
    }
  };

  const handleCreate = async (values) => {
    try {
      await appointmentService.createAppointment(values);
      setOpen(false);
      fetchAppointments();
    } catch (error) {
      console.error('Randevu oluşturulurken hata:', error);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          Yeni Randevu
        </Button>
      </div>

      <Table dataSource={appointments} loading={loading} rowKey="id">
        <Column title="Doktor" dataIndex={['doctor', 'name']} key="doctor" />
        <Column title="Bölüm" dataIndex={['doctor', 'department']} key="department" />
        <Column title="Tarih" dataIndex="date" key="date" />
        <Column title="Saat" dataIndex="time" key="time" />
        <Column
          title="Durum"
          dataIndex="status"
          key="status"
          render={(status) => (
            <Tag color={status === 'confirmed' ? 'green' : 'orange'}>
              {status === 'confirmed' ? 'Onaylandı' : 'Beklemede'}
            </Tag>
          )}
        />
        <Column
          title="İşlemler"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Button type="link">Detay</Button>
              <Button type="link" danger>İptal Et</Button>
            </Space>
          )}
        />
      </Table>

      <Modal
        title="Yeni Randevu"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <AppointmentForm doctors={doctors} onSubmit={handleCreate} />
      </Modal>
    </div>
  );
};

export default Appointments;