"use client"

import { login } from "@/actions/auth"
import Button from "@/components/Button"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

export default function LoginPage() {
    const [state_login, formAction_login, isPending] = useActionState(login, {})

    const router = useRouter()

    useEffect(() => {

        toast(state_login?.message, { type: `${state_login?.status}` })

        if (state_login?.status === 'success'){
            router.push('/')
        }

    }, [state_login])
    
    return (
        <div className="row gx-0 mt-5 justify-content-center align-items-center">
            <div className="col-10 col-md-3">
                <div className="card">
                    <div className="card-body py-5">
                        <h4 className="mb-5 text-center">ورود به پنل ادمین</h4>
                        <form action={formAction_login}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">ایمیل</label>
                                <input type="email" name="email" className="form-control" id="email" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">رمز عبور</label>
                                <input type="password" name="password" className="form-control" />
                            </div>
                            <Button title="ورود" ispending={isPending} style="btn btn-dark" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}