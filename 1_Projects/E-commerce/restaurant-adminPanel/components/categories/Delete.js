"use client"

import { deleteCategory } from "@/actions/categories";
import { useActionState } from "react";
import Button from "../Button";

export default function DeleteCategory({ id }) {

    const [state, formAction, isPending] = useActionState(deleteCategory, {});

    return (
        <>
            <button type="button" className="btn btn-danger mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                حذف
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">حذف دسته بندی</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            آیا مطمئن هستید که میخواهید دسته بندی مورد نظر را پاک کنید؟
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" data-bs-dismiss="modal">خیر</button>
                            <form action={formAction} data-bs-dismiss="modal">
                                <input type="hidden" name="id" value={id} />
                                <Button title="بلی" style="btn btn-secondary" isPending={isPending} />
                            </form>
                            {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}