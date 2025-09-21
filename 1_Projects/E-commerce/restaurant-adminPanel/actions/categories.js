"use server";

import { deleteFetch, postFetch, putFetch } from "@/utils/fetch";
import { handleError } from "@/utils/helper";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function createCategory(state, formData) {

    const name = formData.get('name');

    const description = formData.get('description');

    if (name === '') {
        return {
            status: "error",
            message: "فیلد نام الزامی است"
        }
    }

    if (description === '') {
        return {
            status: "error",
            message: "فیلد توضیحات الزامی است"
        }
    }

    const userToken = (await cookies()).get('token')

    if (!userToken) {

        return {
            status: "error",
            message: "undefined user_token!"
        }
    }

    const data = await postFetch("/categories", { name, description }, { 'Authorization': `Bearer ${userToken.value}` })

    if (data.status === 'success') {

        revalidatePath('/categories');

        return {
            status: data.status,
            message: "دسته بندی مورد نظر ایجاد شد",
        }

    } else {

        return {
            status: data.status,
            message: handleError(data.message),
        }
    }
}

async function deleteCategory(state, formData) {

    const id = formData.get('id');

    if (id === '' || id === null) {
        return {
            status: "error",
            message: "شناسه دسته بندی الزامی است"
        }
    }

    const data = await deleteFetch(`/categories/${id}`)

    if (data.status === 'success') {

        revalidatePath('/categories');
        redirect('/categories');

    } else {

        return {
            status: data.status,
            message: handleError(data.message),
        }
    }
}

async function editCategory(state, formData) {

    const id = formData.get('id');
    const name = formData.get('name');
    const description = formData.get('description');

    if (id === '' || id === null) {
        return {
            status: "error",
            message: "شناسه دسته بندی الزامی است"
        }
    }

    if (name === '') {
        return {
            status: "error",
            message: "فیلد نام دسته بندی الزامی است"
        }
    }

    if (description === '') {
        return {
            status: "error",
            message: "فیلد توضیحات الزامی است"
        }
    }

    const data = await putFetch(`/categories/${id}`, { name, description })

    if (data.status === 'success') {

        revalidatePath('/categories');

        return {
            status: data.status,
            message: "دسته بندی مورد نظر ویرایش شد",
        }
        
    } else {

        return {
            status: data.status,
            message: handleError(data.message),
        }
    }
}

export { createCategory, deleteCategory, editCategory }