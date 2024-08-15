"use client";

import { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { format } from "date-fns";
import GlobalApi from "@/app/home/_utils/GlobalApi";

const CalendarV = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const calendarRef = useRef(null);

  useEffect(() => {
    // Récupérer les événements bloqués au chargement du composant
    GlobalApi.getAllBlockedTime()
      .then(res => {
        const blockedEvents = res.data.data.map(event => {
          const attributes = event.attributes;
          return {
            id: event.id,
            title: attributes.title,
            start: `${attributes.Date}T${attributes.start_time}`,
            end: `${attributes.Date}T${attributes.end_time}`,
            allDay: attributes.all_day
          };
        });

        // Trier les événements du plus récent au plus ancien
        blockedEvents.sort((a, b) => new Date(b.start) - new Date(a.start));

        // Ajouter les événements au calendrier
        if (calendarRef.current) {
          const calendarApi = calendarRef.current.getApi();
          blockedEvents.forEach(event => calendarApi.addEvent(event));
        }
        console.log(blockedEvents);
        setCurrentEvents(blockedEvents);
      })
      .catch(error => {
        console.error("Error fetching blocked time:", error);
      });
  }, []);

  const handleDateClick = (selected) => {

    const title = prompt("Veuillez saisir un nouveau titre pour votre événement");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      const newEvent = {
        id: `${selected.startStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay
      };

      let eventToAdd;
      if (!selected.allDay) {
        var startTime = selected.startStr.split('T')[1].split('+')[0];
        var endTime = selected.endStr.split('T')[1].split('+')[0];
        var date = selected.endStr.split('T')[0];
        eventToAdd = {
          data: {
            title: title,
            start_time: startTime,
            end_time: endTime,
            Date: date,
            all_day: false
          }
        };
      } else {
        eventToAdd = {
          data: {
            title: title,
            start_time: "",
            end_time: "",
            Date: selected.endStr,
            all_day: true
          }
        };
      }

      GlobalApi.addBlockedTime(eventToAdd)
        .then(response => {
          // Ajouter l'événement à la liste et trier
          const updatedEvents = [...currentEvents, newEvent];
          updatedEvents.sort((a, b) => new Date(b.start) - new Date(a.start));

          setCurrentEvents(updatedEvents);
          // Mettre à jour le calendrier avec les nouveaux événements
          if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.removeAllEvents(); // Enlever tous les événements existants
            updatedEvents.forEach(event => calendarApi.addEvent(event)); // Ajouter les événements triés
          }
        })
        .catch(error => {
          console.error("Error adding blocked time:", error);
        });
    }
  };

  const handleEventClick = (selected) => {
    
    // console.log("selected.event delete : ",selected.event._def)
    // console.log("selected.event delete : ",selected.event._def.publicId)
    
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'événement ? '${selected.event.title}'`)) {
      // console.log("id delete : ",selected.event._def.publicId)
      const publicId = selected.event._def.publicId;

      // Appeler la méthode de suppression avec l'identifiant
      GlobalApi.deleteBlockedTime(publicId)
        .then(response => {
          // Traiter la réponse de la suppression si nécessaire
          // console.log('Blocked time deleted successfully:', response);
        })
        .catch(error => {
          // Gérer les erreurs éventuelles
          console.error('Error deleting blocked time:', error);
        });
      selected.event.remove();
      // supprimer de base
      // GlobalApi.getBlockedTimeFiltred()
    }
  };

  return (
    <div className="m-5">
      <div className="flex justify-between">
        {/* BARRE LATÉRALE DU CALENDRIER */}
        <div className="flex-1 bg-gray-100 p-4 rounded-md">
          <h5 className="mb-4">Événements</h5>
          <ul>
            {currentEvents.map((event) => {
              const startDate = new Date(event.start);
              return (
                <li key={event.id} className="bg-green-200 my-2 p-2 rounded">
                  <span>{event.title}</span>
                  <small className="block">
                    {isNaN(startDate.getTime()) ? 'Date invalide' : format(startDate, "yyyy-MM-dd HH:mm")}
                  </small>
                </li>
              );
            })}
          </ul>
        </div>
  
        {/* CALENDRIER */}
        <div className="flex-1 ml-4">
          <FullCalendar
            ref={calendarRef}
            height="75vh"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={currentEvents}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarV;
