"use client"

import { deleteAddress } from "@/actions/profile";
import Button from "@/components/Button";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function DeleteForm({ address }) {

    const [stateDelete, formActionDelete, isPending] = useActionState(deleteAddress, {})

    useEffect(() => {
        toast(stateDelete?.message, { type: `${stateDelete?.status}` })
    }, [stateDelete])

    return (
        <div className="form-delete-address">
            <form action={formActionDelete}>
                <input type="hidden" name="address_id" value={address.id} />
                <Button title="حذف" style="btn btn-dark" isPending={isPending} />
            </form>
        </div>
    )
}