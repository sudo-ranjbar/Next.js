"use client"

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { editCategory } from "@/actions/categories";
import Button from "../Button";

export default function EditCategory({ category }) {

    const [state, formAction, isPending] = useActionState(editCategory, {});

    const router = useRouter();

    useEffect(() => {

        toast(state?.message, { type: `${state?.status}` });
        
        if (state?.status === 'success') {
            router.push("/categories")
        }
    }, [state])

    return (
        <form action={formAction} className="row gy-4">

            <div className="col-md-3">
                <label className="form-label">نام</label>
                <input name='name' defaultValue={category.name} type="text" className="form-control" />
            </div>

            <div className="col-md-3">
                <label className="form-label">توضیحات</label>
                <input name='description' defaultValue={category.description} type="text" className="form-control" />
            </div>

            <input type="hidden" name="id" defaultValue={category.id} />

            <div>
                <Button title="ویرایش دسته بندی" style="btn btn-outline-dark mt-3" isPending={isPending} />
            </div>
        </form>
    )
}