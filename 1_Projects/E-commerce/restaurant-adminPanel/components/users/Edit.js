"use client"

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { editUser } from "@/actions/users";
import Button from "../Button";

export default function EditUser({ user }) {
    const [state, formAction, isPending] = useActionState(editUser, {});
    const router = useRouter();

    useEffect(() => {
        toast(state?.message, { type: `${state?.status}` });
        if (state?.status === 'success') {
            router.push("/users")
        }
    }, [state])

    return (
        <form action={formAction} className="row gy-4">
            <div className="col-md-3">
                <label className="form-label">نام</label>
                <input name="name" defaultValue={user.name} type="text" className="form-control" />
            </div>
            <div className="col-md-3">
                <label className="form-label">ایمیل</label>
                <input name="email" defaultValue={user.email} type="text" className="form-control" />
            </div>
            <div className="col-md-3">
                <label className="form-label">شماره تماس</label>
                <input name="cellphone" defaultValue={user.cellphone} type="text" className="form-control" />
            </div>
            <div className="col-md-3">
                <label className="form-label">رمز عبور</label>
                <input name="password" type="text" className="form-control" />
            </div>
            <input type="hidden" name="id" defaultValue={user.id} />
            <div>
                <Button title="ویرایش کاربر" style="btn btn-outline-dark mt-3" isPending={isPending} />
            </div>
        </form>
    )
}