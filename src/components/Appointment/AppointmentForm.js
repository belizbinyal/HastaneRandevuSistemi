import React from 'react';
import { Form, Input, Button, Select, DatePicker, TimePicker } from 'antd';
import { UserOutlined, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const AppointmentForm = ({ doctors, onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  if (!localStorage.getItem('doctors')) {
  localStorage.setItem('doctors', JSON.stringify([
    { id: 1, name: 'Dr. Ayşe Yılmaz', department: 'Kardiyoloji' },
    { id: 2, name: 'Dr. Mehmet Demir', department: 'Dahiliye' },
    { id: 3, name: 'Dr. Zeynep Kara', department: 'Cildiye' },
    { id: 4, name: 'Dr. Ali Can', department: 'Ortopedi' },
    { id: 5, name: 'Dr. Fatma Çelik', department: 'Göz Hastalıkları' },
    { id: 6, name: 'Dr. Hasan Koç', department: 'Kulak Burun Boğaz' },
    { id: 7, name: 'Dr. Elif Arslan', department: 'Psikiyatri' },
    { id: 8, name: 'Dr. Burak Aydın', department: 'Fizik Tedavi' },
    { id: 9, name: 'Dr. Ceren Yurt', department: 'Kadın Hastalıkları' },
    { id: 10, name: 'Dr. Oğuzhan Yıldız', department: 'Üroloji' },
    { id: 11, name: 'Dr. Ece Polat', department: 'Nöroloji' },
    { id: 12, name: 'Dr. Sibel Tekin', department: 'Diş Hekimliği' },
    { id: 13, name: 'Dr. Canan Şahin', department: 'Alerji' },
    { id: 14, name: 'Dr. Engin Yılmaz', department: 'Endokrinoloji' },
    { id: 15, name: 'Dr. Derya Çetin', department: 'Gastroenteroloji' }
    

  ]));
}

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="doctorId"
        label="Doktor"
        rules={[{ required: true, message: 'Lütfen doktor seçiniz!' }]}
      >
        <Select
          placeholder="Doktor seçiniz"
          suffixIcon={<UserOutlined />}
        >
          {doctors.map(doctor => (
            <Option key={doctor.id} value={doctor.id}>
              {doctor.name} - {doctor.department}
            </Option>
          ))}
        </Select>
      </Form.Item>
      
      <Form.Item
        name="date"
        label="Tarih"
        rules={[{ required: true, message: 'Lütfen tarih seçiniz!' }]}
      >
        <DatePicker 
          style={{ width: '100%' }} 
          suffixIcon={<CalendarOutlined />} 
        />
      </Form.Item>
      
      <Form.Item
        name="time"
        label="Saat"
        rules={[{ required: true, message: 'Lütfen saat seçiniz!' }]}
      >
        <TimePicker 
          style={{ width: '100%' }} 
          format="HH:mm" 
          minuteStep={15} 
          suffixIcon={<ClockCircleOutlined />} 
        />
      </Form.Item>
      
      <Form.Item
        name="notes"
        label="Notlar"
      >
        <Input.TextArea rows={4} placeholder="Randevu ile ilgili notlar..." />
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Randevu Al
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AppointmentForm;