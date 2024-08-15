"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Fragment, useEffect, useState, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'

export default function Calendar() {
  const [deletedEvents, setDeletedEvents] = useState([]);
  const [events, setEvents] = useState([
    { title: 'event 1', id: 1 },
    { title: 'event 2', id: 2 },
    { title: 'event 3', id: 3 },
    { title: 'event 4', id: 4 },
    { title: 'event 5', id: 5 },
  ])
  const [allEvents, setAllEvents] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [idToDelete, setIdToDelete] = useState(null)
  const [eventData, setEventData] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    allDay: false,
    id: 0
  })

  const calendarRef = useRef(null)

  useEffect(() => {
    let draggableEl = document.getElementById('draggable-el')
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          let id = eventEl.getAttribute("data-id") // Utiliser "data-id" pour l'ID
          // console.log("ididididididdi:", id)
          let title = eventEl.getAttribute("title")
          // console.log("title:", title)
          let start = eventEl.getAttribute("data-start") // Utiliser "data-start" pour la date de début
          // console.log("start:", start)
          return { title, id, start }
        }
      })
    }
  }, [])

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi()
      const calendarEvents = calendarApi.getEvents()
      const eventsData = calendarEvents.map(event => ({
        title: event.title,
        start: event.start.toISOString(),
        end: event.end ? event.end.toISOString() : null,
        allDay: event.allDay,
        id: event.id
      }))
      // console.log("event",event.id)
      setAllEvents(allEvents)
    }
  }, [])

  function handleDateClick(arg) {
    setNewEvent({ ...newEvent, start: arg.date, allDay: arg.allDay, id: new Date().getTime() })
    setShowModal(true)
  }

  function addEvent(data) {
    const eventId = data.draggedEl.getAttribute('data-id'); // Récupérer l'ID depuis l'élément déplacé
    const event = {
      ...newEvent,
      start: data.date.toISOString(),
      title: data.draggedEl.innerText,
      allDay: data.allDay,
      id: eventId, // Utiliser l'ID récupéré
    };
    setAllEvents([...allEvents, event]);
  }
  function handleDeleteModal(data) {
    // console.log('Event Data:', data.event);
    // console.log('Event ID:', data.event.id);
    setIdToDelete(data.event.id);
    setShowDeleteModal(true);
    setEventData(data.event); // Set event data for the popup
  }

  function handleDelete() {
  //  console.log("allEvents",allEvents);
    const deletedEvent = allEvents.find(event =>  
      Number(event.id) == Number(idToDelete));
    if (deletedEvent) {
      setAllEvents(prevEvents =>
        prevEvents.filter(event => Number(event.id) !== Number(idToDelete))
      );
      setDeletedEvents(prevDeletedEvents => [...prevDeletedEvents, deletedEvent]); // Ajoute l'événement supprimé à deletedEvents
    }
    setShowDeleteModal(false);
    setIdToDelete(null);
  }
  function handleCloseModal() {
    setShowModal(false)
    setNewEvent({
      title: '',
      start: '',
      allDay: false,
      id: 0
    })
    setShowDeleteModal(false)
    setIdToDelete(null)
  }

  const handleChange = (e) => {
    setNewEvent({
      ...newEvent,
      title: e.target.value
    })
  }
 // Fonction pour générer un ID aléatoire
 const generateRandomId = () => {
  return Math.floor(Math.random() * 100000); // Génère un ID entre 0 et 99999
};

  function handleSubmit(e) {
    e.preventDefault()
    setAllEvents([...allEvents, newEvent])
    setShowModal(false)
    setNewEvent({
      title: '',
      start: '',
      allDay: false,
      id: 0
    })
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-8/12">
        <FullCalendar
  ref={calendarRef}
  plugins={[
    dayGridPlugin,
    interactionPlugin,
    timeGridPlugin
  ]}
  headerToolbar={{
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek'
  }}
  nowIndicator={true}
  editable={true}
  droppable={true}
  selectable={true}
  selectMirror={true}
  dateClick={handleDateClick}
 
  drop={(data) => {
    // console.log("data",data); // Affiche les données dans la console
    addEvent(data); // Appelle la fonction addEvent avec les données
  }}
  eventClick={(data) => {
    // console.log('Clicked Event Data:', data.event); // Ajoutez ce console.log pour afficher les données de l'événement
    handleDeleteModal(data);
  }}
/>
        </div>
        <div id="draggable-el" className="mt-8 lg:mt-0 lg:ml-8 w-full lg:w-4/12 p-2 rounded-md bg-[#ececec]">
        <div>
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom d'evenements</label>
            <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
        </div>
          <h1 className="font-bold text-lg text-center">Drag Event</h1>
          
          {events.map(event => (
            
            <div
              className="fc-event border-2 p-1 mt-2 w-full rounded-md text-center bg-white"
              title={event.title}
              data-id={event.id} // Utiliser "data-id" pour l'ID
              data-start={event.start} // Utiliser "data-start" pour la date de début
              key={event.id}
            >
              {event.title}
            </div>
          ))}
          
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-bold text-lg">All Events</h2>
        <ul>
        {allEvents.map(event => (
          <li key={event.id}>
            {event.title} - {new Date(event.start).toLocaleString()} {event.end ? `to ${new Date(event.end).toLocaleString()}` : ''}
          </li>
        ))}
        </ul>
      </div>
      <div className="mt-8">
        <h2 className="font-bold text-lg">Deleted Events</h2>
        <ul>
          {deletedEvents.map(event => (
            <li key={event.id}>
              {event.title} - {new Date(event.start).toLocaleString()} {event.end ? `to ${new Date(event.end).toLocaleString()}` : ''}
            </li>
          ))}
        </ul>
      </div>
      <Transition.Root show={showDeleteModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowDeleteModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Delete Event
                    </Dialog.Title>
                    <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this event?
                </p>
                {eventData && (
                  <>

                    
                    <p className="text-sm text-gray-500">
                      Event Title: {eventData.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      Event Start: {new Date(eventData.start).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Event ID: {eventData.id}
                    </p>
                    {/* Add more event information here */}
                  </>
                )}
              </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={() => handleDelete()} // Pass idToDelete as a parameter
                >
                  Delete
                </button>
                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
          </Dialog>
      </Transition.Root>
    </>
)
}
