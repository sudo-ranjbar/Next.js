"use client"

import { create } from "@/actions/contact"
import { useActionState, useEffect } from "react"
import Button from "../Button"
import { toast } from "react-toastify"

export default function FormContact() {

    const [state, formAction, isPending] = useActionState(create, {})

    useEffect(() => {

        toast(state?.message, {type: `${state?.status}`})

    }, [state])

    return (
        <div className="form_container">
            <form action={formAction}>
                <div>
                    <input name="name" type="text" className="form-control" placeholder="نام و نام خانوادگی" />
                </div>
                <div>
                    <input name="email" type="email" className="form-control" placeholder="ایمیل" style={{ direction: "rtl" }} />
                </div>
                <div>
                    <input name="subject" type="text" className="form-control" placeholder="موضوع پیام" />
                </div>
                <div>
                    <textarea name="text" rows="10" style={{ height: "100px" }} className="form-control"
                        placeholder="متن پیام"></textarea>
                </div>
                <div className="btn_box">
                    <Button title="ارسال پیام" ispending={isPending} style="" />
                </div>
            </form>
        </div>
    )
}