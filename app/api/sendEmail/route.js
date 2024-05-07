import { Resend } from 'resend';
// import { Email } from './email';

import { NextResponse } from 'next/server';
import EmailTemplate from '../../../emails';
console.log("mail to send1 :")

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req){
    console.log("mail to send2 :")
    const response=await req.json()
   
    try{
        const data = await resend.emails.send({
            from: 'cabinetmarwa@cabinetmarwa.com',         
            to: [response.data.Email],
            subject: 'Confirmation de prise de rendez-vous',
            react: EmailTemplate({response})
          });
        return NextResponse.json({data})
    }catch(error)
    {
        return NextResponse.json({error})
    }
}