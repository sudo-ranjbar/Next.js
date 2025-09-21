"use client"

import { deleteUser } from "@/actions/users";
import Button from "../Button";
import { useActionState } from "react";

export default function DeleteUser({ id }) {
    const [state, formAction, isPending] = useActionState(deleteUser, {})

    return (
        <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            <Button title="حذف" style="btn btn-dark mt-3" ispending={isPending} />
        </form>
    )
}