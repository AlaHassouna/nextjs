const {default:axios} = require("axios");

const API_KEY=process.env.NEXT_PUBLIC_STRAPI_API_KEY

const axiosClient = axios.create({
    baseURL:'http://localhost:1337/api',
    headers: {
        'Authorization':`Bearer ${API_KEY}` 
    }
})

const getCategory=()=>axiosClient.get('/categories?populate=*');
const getDoctorList=()=>axiosClient.get("/doctors?populate=*");
const getDoctorByCategory=(category)=>axiosClient.get("/doctors?filters[category][Name][$in]="+category+"&populate=*")
const getDoctorById=(id)=>axiosClient.get('/doctors/'+id+'?populate=*');
const bookAppointment=(data)=>axiosClient.post('/appointments', data);
const sendEmail=(data)=>axios.post('/api/sendEmail',data);
const getUserBookingList=(userEmail)=>axiosClient.get("/appointments?filters[Email][$eq]="+userEmail+"&populate[doctor][populate][Image][populate][0]=url&populate=*")
const getBookingList=()=>axiosClient.get("/appointments?populate[doctor][populate][Image][populate][0]=url&populate=*")
const deleteBooking=(id)=>axiosClient.delete('/appointments/'+id)
const getBooking=(id)=>axiosClient.get('/appointments/'+id)
const updateBooking = (id, data) => axiosClient.put('/appointments/' + id+'/?populate=Confirmer', data);
const Register=(data)=>axiosClient.post('/patients', data);
const getPatient=(id_patient)=>axiosClient.get("/patients?filters[id_patient][$eq]="+id_patient)
const getPatientEmail=(email)=>axiosClient.get("/patients?filters[email][$eq]="+email)
const getPatients=()=>axiosClient.get("/patients")
const updatePatient = (id, data) => axiosClient.put('/patients/' + id+'/?populate=*', data);
const updateIdPatient = (id, data) => axiosClient.put('/patients/' + id+'?populate=id_patient', data);
const addBlockedTime = (data) => axiosClient.post('/blocked-times', data);
const getBlockedTime = (date,time) => axiosClient.get('/blocked-times?filters[title][$eq]=Rendez-vous%20'+date+'%20'+time+':00');
const getAllBlockedTime = () => axiosClient.get('/blocked-times');
const deleteBlockedTime = (id) => axiosClient.delete('/blocked-times/'+id);
const addFiche = (data) => axiosClient.post('/fiches', data);
const getFiches = (id_patient) => axiosClient.get('/fiches?filters[id_patient][$eq]='+id_patient);
const getFiche = (id_patient,date,time) => axiosClient.get('/fiches?filters[$and][0][id_patient][$eq]='+id_patient+'&filters[$and][1][Date][$eq]='+date+'&filters[$and][2][Time][$eq]='+time);
const updateFiche = (id, data) => axiosClient.put('/fiches/' + id+'?populate=*', data);


export default {
    getCategory,
    getDoctorList,
    getDoctorByCategory,
    getDoctorById,
    bookAppointment,
    sendEmail,
    getUserBookingList,
    deleteBooking,
    updateBooking,
    Register,
    getBookingList,
    getPatient,
    getPatients,
    updatePatient,
    addBlockedTime,
    getAllBlockedTime,
    deleteBlockedTime,
    getBooking,
    addFiche,
    getFiches,
    getFiche,
    updateFiche,
    getBlockedTime,
    getPatientEmail,
    updateIdPatient
}