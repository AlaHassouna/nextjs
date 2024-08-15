import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Clock } from 'lucide-react';
import { DialogClose } from '@radix-ui/react-dialog';
import { Textarea } from "@/components/ui/textarea";
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import GlobalApi from '@/app/home/_utils/GlobalApi';
import { toast } from 'sonner';
import { Input } from "@/components/ui/input";

function BookAppointment({ doctor }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [note, setNote] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const { user } = useKindeBrowserClient();
  const [error, setError] = useState('');
  const [blockedEvents, setBlockedEvents] = useState([]);

  useEffect(() => {
    getTime();
  }, [date, blockedEvents]);

  useEffect(() => {
    // Récupérer les événements bloqués au chargement du composant
    GlobalApi.getAllBlockedTime()
      .then(res => {
        const events = res.data.data.map(event => event.attributes);
        setBlockedEvents(events);
      })
      .catch(error => {
        console.error("Error fetching blocked time:", error);
      });
  }, []);

  const isBlockedTime = (time) => {
    // console.log("time :",time)
    return blockedEvents.some(event => {
      // console.log("event :",event)
      const eventDate = new Date(event.Date);
      const [eventStartHour, eventStartMinute] = event.start_time.split(':').map(Number);
      const eventStartTime = new Date(eventDate.setHours(eventStartHour, eventStartMinute, 0, 0));
      const eventEndTime = new Date(eventStartTime.getTime() + 30 * 60000); // Ajouter 30 minutes au temps de début
  
      const [timeHour, timeMinute] = time.split(':').map(Number);
      const timeStart = new Date(date.setHours(timeHour, timeMinute, 0, 0));
      const timeEnd = new Date(timeStart.getTime() + 45 * 60000); // Ajouter 45 minutes au temps de début
      // console.log("eventStartTime :",eventStartTime)
      // console.log("eventEndTime :",eventEndTime)
      // console.log("timeStart :",timeStart)
      // console.log("timeEnd :",timeEnd)
      // console.log("date.toDateString() :",date.toDateString())
      return date.toDateString() === eventDate.toDateString() &&
        ((timeStart >= eventStartTime && timeStart < eventEndTime) || (timeEnd > eventStartTime && timeEnd <= eventEndTime) ||
         (timeStart <= eventStartTime && timeEnd >= eventEndTime)); // Vérifier chevauchement
    });
  };

  const getTime = () => {
    let timeList = [];
    const now = new Date();
  
    // Définir les heures de début et de fin
    const startHour = 8;
    const endHour = 18;
    const endMinute = 30;
  
    // Générer tous les créneaux horaires de 8:00 à 18:30
    let currentHour = startHour;
    let currentMinute = 0;
  
    while (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute)) {
      const timeStr = `${currentHour}:${currentMinute.toString().padStart(2, '0')}`;
      timeList.push({ time: timeStr });
  
      // Incrémenter de 45 minutes
      currentMinute += 45;
      if (currentMinute >= 60) {
        currentMinute -= 60;
        currentHour += 1;
      }
    }
  
    // Calculer l'heure actuelle plus 60 minutes
    let minHour = now.getHours();
    let minMinute = now.getMinutes();
  
    minMinute += 60; // Ajouter 60 minutes
  
    if (minMinute >= 60) {
      minHour += Math.floor(minMinute / 60);
      minMinute = minMinute % 60;
    }
  
    // Arrondir au créneau de 45 minutes le plus proche
    if (minMinute % 45 !== 0) {
      minMinute = Math.ceil(minMinute / 45) * 45;
      if (minMinute === 60) {
        minMinute = 0;
        minHour += 1;
      }
    }
  
    // Créer une chaîne de temps pour la comparaison
    const minTimeStr = `${minHour}:${minMinute.toString().padStart(2, '0')}`;
  
    // Filtrer les créneaux horaires en fonction de la date choisie
    const filteredTimeList = timeList.filter(slot => {
      const [slotHour, slotMinute] = slot.time.split(':').map(Number);
  
      // Convertir les créneaux horaires en minutes pour la comparaison
      const slotTotalMinutes = slotHour * 60 + slotMinute;
      const minTotalMinutes = minHour * 60 + minMinute;
  
      // Si la date choisie est aujourd'hui, exclure les créneaux horaires passés
      if (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      ) {
        return slotTotalMinutes >= minTotalMinutes && !isBlockedTime(slot.time);
      }
  
      // Sinon, ne pas bloquer les créneaux horaires en fonction de l'heure actuelle
      return !isBlockedTime(slot.time);
    });
  
    setTimeSlot(filteredTimeList);
  };
  
  
  
  
  

  const saveBooking = () => {
    if (!nom || !prenom || !telephone) {
      setError('Les champs Nom, Prénom et Numéro de téléphone sont obligatoires.');
      return;
    }
  
    // Convertir la date au format YYYY-MM-DD
    const formattedDate = date.toISOString().split('T')[0]; // Extrait YYYY-MM-DD
  
    const data = {
      data: {
        UserName: user.given_name + " " + user.family_name,
        Email: user.email,
        Date: formattedDate, // Utilisez la date formatée
        Time: selectedTimeSlot,
        Note: note,
        Nom: nom,
        Prenom: prenom,
        Telephone: telephone,
        doctor: doctor.id,
        id_patient: user.id
      }
    };
  
    GlobalApi.bookAppointment(data).then(resp => {
      if (resp) {
        GlobalApi.sendEmail(data).then(resp => {
          // console.log("resp", resp);
        });
        toast("Nous vous appellerons pour confirmation. Si non, merci de nous contacter à ce numéro 25202020.", { duration: 8000 });
      }
    });
  };

  const isPastDay = (day) => {
    const today = new Date();
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const dayDate = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    return dayDate < todayDate;
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleNomChange = (event) => {
    setNom(event.target.value);
    setError('');
  };

  const handlePrenomChange = (event) => {
    setPrenom(event.target.value);
    setError('');
  };

  const handleTelephoneChange = (event) => {
    setTelephone(event.target.value);
    setError('');
  };

  return (
    <Dialog>
      <DialogTrigger className='mt-3'>
        <a style={{ whiteSpace: 'nowrap' }} className='bg-primary text-white button w-[100%] p-2 hover:bg-[#B0D9FF] hover:text-primary duration-300 rounded-full'>
          Prendre un rendez-vous
        </a>
      </DialogTrigger>
      <DialogContent className="max-h-[90%] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Prendre un rendez-vous</DialogTitle>
          <DialogDescription>
            <div>
              <div className='grid grid-cols-1 md:grid-cols-2 w-[100%]'>
                {/* Calendar */}
                <div className='flex flex-col gap-3 items-baseline mt-3'>
                  <h2 className='flex gap-2 items-center'>
                    <CalendarDays className='text-primary h-5 w-5' />
                    Sélectionner une date
                  </h2>
                  <Calendar
                    disabled={isPastDay}
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
                {/* Time Slot */}
                <div className='mt-3 p-0 md:mt-0'>
                  <h2 className='flex gap-2 items-center sm:mt-2 sm:mb-2 mb-3'>
                    <Clock className='text-primary h-5 w-5' />
                    Sélectionner un créneau horaire
                  </h2>
                  <div className='grid grid-cols-3 gap-2 border rounded-lg p-5'>
                    {timeSlot && timeSlot.map((item, index) => (
                      <h2
                        key={index}
                        onClick={() => setSelectedTimeSlot(item.time)}
                        className={`cursor-pointer p-2 border rounded-full text-center hover:bg-primary hover:text-white ${item.time === selectedTimeSlot && 'bg-primary text-white'}`}>
                        {item.time}
                      </h2>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="nom" className="text-right">
                Nom<span className="text-red-500">*</span>
              </label>
              <Input id="nom" value={nom} onChange={handleNomChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="prenom" className="text-right">
                Prénom<span className="text-red-500">*</span>
              </label>
              <Input id="prenom" value={prenom} onChange={handlePrenomChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="telephone" className="text-right">
                Numéro de téléphone<span className="text-red-500">*</span>
              </label>
              <Input id="telephone" value={telephone} onChange={handleTelephoneChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="note" className="text-right">
                Note
              </label>
              <Textarea id="note" value={note} onChange={handleNoteChange} className="col-span-3" />
            </div>
            {error && (
              <div className="text-red-500 text-center">
                {error}
              </div>
            )}
          </div>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={saveBooking}>Prendre un rendez-vous</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BookAppointment;
