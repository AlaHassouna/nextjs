import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Calendar } from "@/components/ui/calendar"
import { CalendarDays, Clock } from 'lucide-react'
import { DialogClose } from '@radix-ui/react-dialog'
import { Textarea } from "@/components/ui/textarea"
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'


function BookAppointment({doctor}) {

    const [date, setDate] = useState(new Date());
    const[timeSlot,setTimeSlot]=useState();
    const[selectedTimeSlot,setselectedTimeSlot]=useState();
    const[note,setNote]=useState();
    const{user}=useKindeBrowserClient();

    useEffect(()=>{
        getTime();
    },[])
    const getTime=()=>{
        const timeList=[];
    for(let i=8;i<=21;i++){
        timeList.push({
            time:i+ ':00'
        })
        timeList.push({
            time:i+ ':30'
        })
    }
    setTimeSlot(timeList)
        }
        const  saveBooking=()=>{
            const data={
                data:{
                    UserName:user.given_name+" "+user.family_name,
                    Email:user.email,
                    Date:date,
                    Time:selectedTimeSlot,
                    Note:note,
                    doctor:doctor.id

                }
            }
           
            GlobalApi.bookAppointment(data).then(resp=>{
                
                if(resp){
                    console.log("resp1")
                        console.log(resp)
                        console.log("data")
                        console.log(data);
                    GlobalApi.sendEmail(data).then(resp=>{
                        console.log("resp")
                        console.log(resp)
                    })
                    toast("La confirmation de rendez-vous vous sera envoyée par e-mail.")
                }
            })
        }
        const isPastDay=(day)=>{
            return day<new Date();
        }
        const handleNoteChange = (event) => {
            setNote(event.target.value); // Met à jour la variable note avec la valeur du Textarea
        };
  return (
    <Dialog>
        <DialogTrigger className='mt-3'>
            <a style={{ whiteSpace: 'nowrap' }} className='bg-primary text-white button   w-[100%] p-2 hover:bg-[#B0D9FF] hover:text-primary duration-300 rounded-full '>Prendre un rendez-vous</a>
                    </DialogTrigger>
        <DialogContent className="max-h-[90%] overflow-scroll">
            <DialogHeader>
            <DialogTitle>Prendre un rendez-vous</DialogTitle>
            <DialogDescription>
                <div>
                    <div className='grid grid-cols-1 md:grid-cols-2 w-[100%] '>
                        {/* Calender */}
                        <div className='flex flex-col gap-3 items-baseline mt-3 '>
                            <h2 className='flex gap-2 items-center'>
                                <CalendarDays className='text-primary h-5 w-5'/>
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
                        <div className='mt-3 p-0 md:mt-0 ' >
                            <h2 className='flex gap-2 items-center sm:mt-2 sm:mb-2 mb-3 '> 
                                <Clock className='text-primary h-5 w-5'/>
                                Sélectionner un créneau horaire
                            </h2>
                            <div className='grid grid-cols-3 gap-2 border rounded-lg p-5 '>
                                {timeSlot &&timeSlot.map((item,index)=>(
                                    <h2 
                                    onClick={()=>setselectedTimeSlot(item.time)}
                                    className={`cursor-pointer p-2 border rounded-full text-center hover:bg-primary hover:text-white ${item.time==selectedTimeSlot&&'bg-primary text-white'}`}>
                                       {item.time} 
                                    </h2>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
            </DialogDescription>
            <Textarea value={note} onChange={handleNoteChange} />
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                    <>
                    <Button type="button" 
                    variant="outline" 
                    className="text-red-500 border-red-500">
                    Close
                    </Button>
                    <Button type="button" disabled={!(date&&selectedTimeSlot)}
                    onClick={()=>saveBooking()}
                    >
                    Confirmer
                    </Button>
                    </>
                </DialogClose>
        </DialogFooter>
        </DialogContent>
    </Dialog>

  )
}

export default BookAppointment