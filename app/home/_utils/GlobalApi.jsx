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
const updateBooking = (id, data) => axiosClient.put('/appointments/' + id+'/?populate=Confirmer', data);
const Register=(data)=>axiosClient.post('/patients', data);
const getPatient=(id_patient)=>axiosClient.get("/patients?filters[id_patient][$eq]="+id_patient)
const getPatients=()=>axiosClient.get("/patients")
const updatePatient = (id, data) => axiosClient.put('/patients/' + id+'?populate=*', data);
const addBlockedTime = (data) => axiosClient.post('/blocked-times', data);
const getAllBlockedTime = () => axiosClient.get('/blocked-times');
const deleteBlockedTime = (id) => axiosClient.delete('/blocked-times/'+id);


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
    deleteBlockedTime
}