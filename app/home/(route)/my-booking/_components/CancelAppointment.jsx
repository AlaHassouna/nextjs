import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
  
function CancelAppointment({onContinueClick}) {

  
  return (
    <AlertDialog>
  <AlertDialogTrigger>
    <Button variant="outline" className="text-primary border-primary">
      Annuler </Button>
      </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
      Cela supprimera <b>définitivement</b> votre rendez-vous.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel >Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>onContinueClick()}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}

export default CancelAppointment