import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Tag, 
  Space, 
  Button, 
  Popconfirm, 
  message, 
  Badge, 
  Card, 
  Select,
  DatePicker,
  Row,
  Col 
} from 'antd';
import { 
  CalendarOutlined, 
  ClockCircleOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  SyncOutlined,
  SearchOutlined
} from '@ant-design/icons';
import moment from 'moment';
import appointmentService from '../../services/appointmentService';

const { Column } = Table;
const { Option } = Select;
const { RangePicker } = DatePicker;

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const statusColors = {
    pending: 'orange',
    confirmed: 'green',
    cancelled: 'red',
    completed: 'blue',
  };

  const statusTexts = {
    pending: 'Beklemede',
    confirmed: 'Onaylandı',
    cancelled: 'İptal Edildi',
    completed: 'Tamamlandı',
  };

  const fetchAppointments = React.useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const query = {
        page: pagination.current,
        limit: pagination.pageSize,
        status: filterStatus !== 'all' ? filterStatus : undefined,
        startDate: dateRange[0] ? moment(dateRange[0]).format('YYYY-MM-DD') : undefined,
        endDate: dateRange[1] ? moment(dateRange[1]).format('YYYY-MM-DD') : undefined,
        ...params,
      };

      const response = await appointmentService.getAppointments(query);
      setAppointments(response.data);
      setPagination(prev => ({
        ...prev,
        total: response.total,
      }));
    } catch (error) {
      message.error('Randevular yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  }, [pagination, filterStatus, dateRange]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleCancelAppointment = async (id) => {
    try {
      await appointmentService.cancelAppointment(id);
      message.success('Randevu iptal edildi');
      fetchAppointments();
    } catch (error) {
      message.error('Randevu iptal edilirken bir hata oluştu');
    }
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const handleStatusFilterChange = (value) => {
    setFilterStatus(value);
    setPagination({ ...pagination, current: 1 });
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    setPagination({ ...pagination, current: 1 });
  };

  const handleRefresh = () => {
    fetchAppointments();
  };

  return (
    <Card
      title={
        <Space>
          <CalendarOutlined />
          <span>Randevu Listesi</span>
          <Badge count={appointments.length} showZero />
        </Space>
      }
      extra={
        <Button 
          icon={<SyncOutlined />} 
          onClick={handleRefresh}
          loading={loading}
        >
          Yenile
        </Button>
      }
    >
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Select
            style={{ width: '100%' }}
            placeholder="Durum Filtresi"
            value={filterStatus}
            onChange={handleStatusFilterChange}
          >
            <Option value="all">Tüm Randevular</Option>
            <Option value="pending">Beklemede</Option>
            <Option value="confirmed">Onaylanmış</Option>
            <Option value="cancelled">İptal Edilmiş</Option>
            <Option value="completed">Tamamlanmış</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <RangePicker
            style={{ width: '100%' }}
            onChange={handleDateRangeChange}
            disabledDate={(current) => current && current > moment().endOf('day')}
          />
        </Col>
      </Row>

      <Table
        dataSource={appointments}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
      >
        <Column
          title="Doktor"
          dataIndex={['doctor', 'name']}
          key="doctor"
          render={(text, record) => (
            <Space>
              <span>{text}</span>
              <Tag color="blue">{record.doctor.specialization}</Tag>
            </Space>
          )}
        />
        <Column
          title="Tarih & Saat"
          key="datetime"
          render={(_, record) => (
            <Space>
              <Tag icon={<CalendarOutlined />}>
                {moment(record.date).format('DD.MM.YYYY')}
              </Tag>
              <Tag icon={<ClockCircleOutlined />}>
                {record.time}
              </Tag>
            </Space>
          )}
        />
        <Column
          title="Durum"
          dataIndex="status"
          key="status"
          render={(status) => (
            <Tag color={statusColors[status]}>
              {statusTexts[status]}
            </Tag>
          )}
        />
        <Column
          title="Notlar"
          dataIndex="notes"
          key="notes"
          ellipsis
        />
        <Column
          title="İşlemler"
          key="action"
          fixed="right"
          render={(_, record) => (
            <Space size="middle">
              {record.status === 'pending' && (
                <>
                  <Button 
                    type="primary" 
                    icon={<EditOutlined />} 
                    size="small"
                  >
                    Düzenle
                  </Button>
                  <Popconfirm
                    title="Randevuyu iptal etmek istediğinize emin misiniz?"
                    onConfirm={() => handleCancelAppointment(record.id)}
                    okText="Evet"
                    cancelText="Hayır"
                  >
                    <Button 
                      danger 
                      icon={<DeleteOutlined />} 
                      size="small"
                    >
                      İptal Et
                    </Button>
                  </Popconfirm>
                </>
              )}
              <Button 
                type="default" 
                icon={<SearchOutlined />} 
                size="small"
              >
                Detay
              </Button>
            </Space>
          )}
        />
      </Table>
    </Card>
  );
};

export default AppointmentList;