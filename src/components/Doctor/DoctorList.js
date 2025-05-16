import React, { useState, useEffect, useCallback } from 'react';
import { Card, List, Avatar, Tag, Input, Select, Row, Col, Button, Rate } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getDoctors } from '../../services/doctorService';

//const { Search } = Input;
const { Option } = Select;

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const filterDoctors = useCallback(() => {
    let result = [...doctors];
    
    if (selectedSpecialty !== 'all') {
      result = result.filter(doc => doc.specialization === selectedSpecialty);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(doc => 
        doc.name.toLowerCase().includes(query) ||
        doc.specialization.toLowerCase().includes(query)
      );
    }
    
    setFilteredDoctors(result);
  }, [doctors, searchQuery, selectedSpecialty]);

  useEffect(() => {
    filterDoctors();
  }, [filterDoctors]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const data = await getDoctors();
      setDoctors(data);
    } catch (error) {
      console.error('Doktorlar yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const specialties = [...new Set(doctors.map(doc => doc.specialization))];

  return (
    <div>
      <Card title="Doktorlarımız" style={{ marginBottom: 20 }}>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Doktor ara..."
              prefix={<SearchOutlined />}
              onChange={(e) => setSearchQuery(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Select
              style={{ width: '100%' }}
              placeholder="Uzmanlık alanı seçin"
              onChange={setSelectedSpecialty}
              value={selectedSpecialty}
            >
              <Option value="all">Tüm Uzmanlıklar</Option>
              {specialties.map(spec => (
                <Option key={spec} value={spec}>{spec}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Card>

      <List
        itemLayout="horizontal"
        dataSource={filteredDoctors}
        loading={loading}
        renderItem={doctor => (
          <List.Item
            actions={[
              <Button type="primary" href={`/randevu?doctorId=${doctor.id}`}>
                Randevu Al
              </Button>
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar size={64} src={doctor.image} />}
              title={
                <div>
                  <span style={{ marginRight: 10 }}>{doctor.name}</span>
                  <Tag color="blue">{doctor.specialization}</Tag>
                </div>
              }
              description={
                <div>
                  <div>
                    <Tag color="green">{doctor.hospital}</Tag>
                    <Tag color="purple">{doctor.experience} deneyim</Tag>
                  </div>
                  <div style={{ marginTop: 5 }}>
                    <Rate disabled defaultValue={doctor.rating} />
                  </div>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default DoctorList;