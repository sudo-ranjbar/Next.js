"use client"

import { deleteProduct } from "@/actions/products";
import Button from "../Button";
import { useActionState } from "react";

export default function DeleteProduct({ id }) {
    const [state, formAction, isPending] = useActionState(deleteProduct, {});

    return (
        <form action={formAction} className="mb-3">
            <input type="hidden" name="id" value={id} />
            <Button title="حذف" style="btn btn-dark mt-3" isPending={isPending} />
        </form>
    )
}