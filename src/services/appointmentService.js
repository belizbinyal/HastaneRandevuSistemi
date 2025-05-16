// src/services/appointmentService.js

import { getDoctorById } from './doctorService';

// Mock veri deposu
let appointments = [];
let nextId = 1;

// Hasta ID'sini localStorage'dan al
const getCurrentPatientId = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.id || 1;
};

// Tüm randevuları getir
const getAppointments = async () => {
  try {
    const patientId = getCurrentPatientId();
    const patientAppointments = appointments.filter(
      app => app.patientId === patientId
    );
    
    // Doktor bilgilerini ekle
    const appointmentsWithDoctors = await Promise.all(
      patientAppointments.map(async app => {
        const doctor = await getDoctorById(app.doctorId);
        return { ...app, doctor };
      })
    );
    
    return appointmentsWithDoctors.sort((a, b) => 
      new Date(b.date + 'T' + b.time) - new Date(a.date + 'T' + a.time)
    );
  } catch (error) {
    console.error('Randevular getirilirken hata:', error);
    throw error;
  }
};

// Doktor randevularını getir
const getDoctorAppointments = async (doctorId, date = null) => {
  let doctorApps = appointments.filter(app => app.doctorId === doctorId);
  
  if (date) {
    doctorApps = doctorApps.filter(app => app.date === date);
  }
  
  return doctorApps.sort((a, b) => a.time.localeCompare(b.time));
};

// Yeni randevu oluştur
const createAppointment = async (appointmentData) => {
  try {
    // Aynı doktor, tarih ve saatte randevu kontrolü
    const existingAppointment = appointments.find(app => 
      app.doctorId === appointmentData.doctorId &&
      app.date === appointmentData.date &&
      app.time === appointmentData.time
    );
    
    if (existingAppointment) {
      throw new Error('Bu saatte başka bir randevu bulunmaktadır');
    }
    
    const newAppointment = {
      id: nextId++,
      ...appointmentData,
      patientId: getCurrentPatientId(),
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    
    appointments.push(newAppointment);
    
    // Doktor bilgilerini ekleyerek döndür
    const doctor = await getDoctorById(appointmentData.doctorId);
    return { ...newAppointment, doctor };
  } catch (error) {
    console.error('Randevu oluşturma hatası:', error);
    throw error;
  }
};

// Randevu iptali
const cancelAppointment = async (appointmentId) => {
  const index = appointments.findIndex(app => app.id === appointmentId);
  
  if (index === -1) {
    throw new Error('Randevu bulunamadı');
  }
  
  // Randevu durumunu cancelled olarak güncelle
  appointments[index] = {
    ...appointments[index],
    status: 'cancelled',
    cancelledAt: new Date().toISOString()
  };
  
  return appointments[index];
};

// Randevu güncelleme
const updateAppointment = async (appointmentId, updateData) => {
  const index = appointments.findIndex(app => app.id === appointmentId);
  
  if (index === -1) {
    throw new Error('Randevu bulunamadı');
  }
  
  appointments[index] = {
    ...appointments[index],
    ...updateData
  };
  
  return appointments[index];
};
const getDoctors = async () => {
  try {
    const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
    return doctors;
  } catch (error) {
    console.error('Doktorlar getirilirken hata:', error);
    throw error;
  }
};

// Doktorun uygun saatlerini getir
const getAvailableSlots = async (doctorId, date) => {
  const doctor = await getDoctorById(doctorId);
  if (!doctor) throw new Error('Doktor bulunamadı');
  
  const doctorApps = await getDoctorAppointments(doctorId, date);
  const bookedSlots = doctorApps.map(app => app.time);
  
  // Doktorun çalışma saatleri (09:00-17:00, öğle arası 12:00-13:20)
  const allSlots = [];
  const startHour = 9;
  const endHour = 17;
  const lunchStart = 12;
  const lunchEnd = 13.33; // 13:20
  
  for (let hour = startHour; hour < endHour; hour += 0.33) {
    // Öğle arası kontrolü
    if (hour >= lunchStart && hour < lunchEnd) continue;
    
    const hourPart = Math.floor(hour);
    const minutePart = Math.round((hour % 1) * 60);
    const timeString = `${hourPart.toString().padStart(2, '0')}:${minutePart.toString().padStart(2, '0')}`;
    
    // Eğer bu saat dolu değilse ekle
    if (!bookedSlots.includes(timeString)) {
      allSlots.push(timeString);
    }
  }
  
  return allSlots;
};

const appointmentService = {
  getDoctors,
  getAppointments,
  getDoctorAppointments,
  createAppointment,
  cancelAppointment,
  updateAppointment,
  getAvailableSlots,
  

  clearMockData: () => {
    appointments = [];
    nextId = 1;
  }
};

export default appointmentService;