"use client"
import { editForm } from "@/actions/profile"
import Button from "@/components/Button"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"


export default function EditForm({ userInfo }) {

    const [state, formAction, isPending] = useActionState(editForm, {})

    useEffect(() => {
        toast(state?.message, { type: `${state?.status}` })
    }, [state])

    return (
        <form action={formAction}>
            <div className="row g-4">
                <div className="col col-md-6">
                    <label className="form-label">نام و نام خانوادگی</label>
                    <input name="name" type="text" className="form-control" defaultValue={userInfo.name} />
                </div>
                <div className="col col-md-6">
                    <label className="form-label">ایمیل</label>
                    <input name="email" type="email" className="form-control" defaultValue={userInfo.email} />
                </div>
                <div className="col col-md-6">
                    <label className="form-label">شماره تلفن</label>
                    <input type="text" disabled className="form-control" defaultValue={userInfo.cellphone} />
                </div>
            </div>
            <Button title="ویرایش" isPending={isPending} style="btn btn-primary mt-sm-3" />
        </form>
    )
}