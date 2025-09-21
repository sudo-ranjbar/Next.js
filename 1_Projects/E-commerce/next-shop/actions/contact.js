"use server"

import { postFetch } from "@/utils/fetch"
import { handleError } from "@/utils/helper"

export async function create(state, formData) {

    const name = formData.get('name')
    const email = formData.get('email')
    const subject = formData.get('subject')
    const text = formData.get('text')

    if (name === '' || email === '' || subject === '' || text === '') {
        return {
            status: "error",
            message: "پر کردن تمام موارد ارزامی است، ممنون"
        }
    }

    const data = await postFetch("/contact-us", {
        name,
        email,
        subject,
        text
    })

    if (data.status === 'success'){
        
        return {
            status: data.status,
            message: "پیام شما به درستی ارسال شد، ممنون از ثبت پیام!!"
        }
    }else {

        return {
            status: data.status,
            message: handleError(data.message)
        }
    }


    
}