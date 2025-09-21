"use client"
import Button from "../Button";
import { login } from "@/actions/auth"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

export default function LoginForm({ setStep }) {

    const [state_login, formAction_login, isPending] = useActionState(login, {})

    useEffect(() => {

        toast(state_login?.message, { type: `${state_login?.status}` })

        if (state_login?.status === 'success'){
            setStep(2)
        }
        
    }, [state_login, setStep])

    return (
        <div className="card">
            <div className="card-body">
                <div className="form_container">

                    <form action={formAction_login}>
                        <div className="mb-3">
                            <label className="form-label">شماره موبایل</label>
                            <input name="phone" type="text" className="form-control" />
                        </div>
                        <Button title="ورود" ispending={isPending} style="btn btn-primary btn-auth" />
                    </form>

                </div>
            </div>
        </div>
    )
}