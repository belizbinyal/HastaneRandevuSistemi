// src/services/doctorService.js

const specialties = [
  "Kardiyoloji", "Nöroloji", "Ortopedi", "Dahiliye", "Genel Cerrahi",
  "Göz Hastalıkları", "Kulak Burun Boğaz", "Dermatoloji", "Psikiyatri",
  "Üroloji", "Kadın Hastalıkları", "Çocuk Sağlığı", "Gastroenteroloji",
  "Endokrinoloji", "Romatoloji", "Fizik Tedavi", "Nöroşirurji",
  "Göğüs Hastalıkları", "Enfeksiyon Hastalıkları", "Acil Tıp",
  "Radyoloji", "Anesteziyoloji", "Patoloji", "Plastik Cerrahi",
  "Kalp Damar Cerrahisi", "Onkoloji", "Hematoloji", "Nefroloji",
  "Algoloji", "Çocuk Nörolojisi", "Çocuk Kardiyolojisi", "Çocuk Cerrahisi",
  "Çocuk Endokrinolojisi", "Çocuk Gastroenterolojisi", "Çocuk Enfeksiyon"
];

const hospitals = [
  "Ankara Şehir Hastanesi",
  "İstanbul Tıp Fakültesi",
  "İzmir Kent Hastanesi",
  "Acıbadem Hastanesi",
  "Memorial Hastanesi",
  "Medipol Üniversite Hastanesi",
  "Liv Hospital",
  "Medical Park Hastanesi",
  "Florence Nightingale Hastanesi",
  "Anadolu Sağlık Merkezi"
];

const generateDoctors = () => {
  const doctors = [];
  let id = 1;
  
  specialties.forEach(specialty => {
    // Her branştan 3 doktor
    for (let i = 0; i < 3; i++) {
      const gender = Math.random() > 0.5 ? 'men' : 'women';
      doctors.push({
        id: id++,
        name: `Dr. ${specialty.substring(0, 3)} ${i+1}`,
        fullName: `Dr. ${["Ahmet", "Mehmet", "Ayşe", "Fatma", "Zeynep", "Can", "Deniz"][Math.floor(Math.random() * 7)]} ${["Yılmaz", "Demir", "Kaya", "Çelik", "Şahin"][Math.floor(Math.random() * 5)]}`,
        specialization: specialty,
        hospital: hospitals[Math.floor(Math.random() * hospitals.length)],
        experience: `${Math.floor(Math.random() * 20) + 5} yıl`,
        rating: (Math.random() * 1 + 4).toFixed(1),
        image: `https://randomuser.me/api/portraits/${gender}/${id}.jpg`,
        availableDays: ['Monday', 'Wednesday', 'Friday'],
        description: `${specialty} alanında uzman doktorumuz ${Math.floor(Math.random() * 20) + 5} yıllık deneyime sahiptir.`
      });
    }
  });
  
  return doctors;
};

const doctors = generateDoctors();

export const getDoctors = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(doctors);
    }, 500);
  });
};

export const getDoctorById = async (id) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(doctors.find(doctor => doctor.id === parseInt(id)));
    }, 500);
  });
};

export const getSpecialties = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(specialties);
    }, 300);
  });
};