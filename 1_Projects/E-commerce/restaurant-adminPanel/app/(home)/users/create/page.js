"use client"

import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { createUser } from "@/actions/users";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function CreateUserPage() {
    const [state, formAction, isPending] = useActionState(createUser, {})
    const router = useRouter();

    useEffect(() => {
        toast(state?.message, { type: `${state?.status}` });
        if (state?.status === 'success') {
            router.push("/users")
        }
    }, [state])

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h4 className="fw-bold">ایجاد کاربر</h4>
            </div>

            <form action={formAction} className="row gy-4">
                <div className="col-md-3">
                    <label className="form-label">نام</label>
                    <input name="name" type="text" className="form-control" />
                </div>
                <div className="col-md-3">
                    <label className="form-label">ایمیل</label>
                    <input name="email" type="text" className="form-control" />
                </div>
                <div className="col-md-3">
                    <label className="form-label">شماره تماس</label>
                    <input name="cellphone" type="text" className="form-control" />
                </div>
                <div className="col-md-3">
                    <label className="form-label">رمز عبور</label>
                    <input name="password" type="text" className="form-control" />
                </div>
                <div>
                    <Button title="ایجاد کاربر" style="btn btn-outline-dark mt-3" ispending={isPending} />
                </div>
            </form>
        </>
    )
}