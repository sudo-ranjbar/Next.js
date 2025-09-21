"use client"

import { useActionState, useEffect, useState } from "react"
import { toast } from "react-toastify"
import Button from "../Button"
import { resendOtp } from "@/actions/auth"

export default function ResendOtpButton() {

    const [state_resend, formAction_resend, isPending] = useActionState(resendOtp, {})

    useEffect(() => {

        toast(state_resend?.message, { type: `${state_resend?.status}` })
        if (state_resend?.status === 'success') {
            setMinute(0)
            setSecond(20)
        }

    }, [state_resend])

    const [minute, setMinute] = useState(0)
    const [second, setSecond] = useState(20)

    useEffect(() => {

        const interval = setInterval(() => {
            if (second > 0) {
                setSecond(second - 1)
            }

            if (second === 0) {
                if (minute === 0) {
                    clearInterval(interval)
                } else {
                    setSecond(59)
                    setMinute(minute - 1)
                }
            }
        }, 1000)

        return () => {
            clearInterval(interval)
        }

    }, [second, minute])


    return (
        <div className="resend-otp-btn">
            {second > 0 || minute > 0 ? (
                <div className="mb-1 me-3">
                    {second < 10 ? `0${second}` : second} : {minute < 10 ? `0${minute}` : `${minute}`}
                </div>
            ) : (
                <form action={formAction_resend}>
                    <Button title="ارسال دوباره" style="btn btn-dark" isPending={isPending} />
                </form>
            )
            }

        </div >
    )
}