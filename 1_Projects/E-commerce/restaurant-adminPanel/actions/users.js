"use server";

import { deleteFetch, postFetch, putFetch } from "@/utils/fetch";
import { handleError } from "@/utils/helper";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createUser(state, formData) {
    
    const name = formData.get('name');
    const email = formData.get('email');
    const cellphone = formData.get('cellphone');
    const password = formData.get('password');

    if (name === '') {

        return {
            status: "error",
            message: "فیلد نام کاربر الزامی است"
        }
    }

    if (email === '') {

        return {
            status: "error",
            message: "فیلد ایمیل کاربر الزامی است"
        }
    }

    const pattern = /^(\+98|0)?9\d{9}$/i;
    if (cellphone === '' || !pattern.test(cellphone)) {

        return {
            status: "error",
            message: "فیلد شماره تماس کاربر نامعتبر است."
        }
    }

    if (password === '') {

        return {
            status: "error",
            message: "فیلد رمز عبور کاربر الزامی است"
        }
    }

    const userToken = (await cookies()).get('token')

    if (!userToken) {

        return {
            status: "error",
            message: "undefined user_token!"
        }
    }

    const data = await postFetch("/users", { name, email, cellphone, password }, { 'Authorization': `Bearer ${userToken.value}` })

    if (data.status === 'success') {

        revalidatePath('/users');

        return {
            status: data.status,
            message: "کاربر مورد نظر ایجاد شد",
        }

    } else {

        return {
            status: data.status,
            message: handleError(data.message),
        }
    }
}

export async function deleteUser(state, formData) {

    const id = formData.get('id');

    if (id === '' || id === null) {

        return {
            status: "error",
            message: "شناسه کاربر الزامی است"
        }
    }

    const userToken = (await cookies()).get('token')

    if (!userToken) {

        return {
            status: "error",
            message: "undefined user_token!"
        }
    }

    const data = await deleteFetch(`/users/${id}`)

    if (data.status === 'success') {

        revalidatePath('/users');
        redirect('/users');

    } else {

        return {
            status: data.status,
            message: handleError(data.message),
        }
    }
}

export async function editUser(state, formData) {
    const id = formData.get('id');
    const name = formData.get('name');
    const email = formData.get('email');
    const cellphone = formData.get('cellphone');
    const password = formData.get('password');

    if (id === '' || id === null) {
        return {
            status: "error",
            message: "شناسه کاربر الزامی است"
        }
    }

    if (name === '') {
        return {
            status: "error",
            message: "فیلد نام کاربر الزامی است"
        }
    }

    if (email === '') {
        return {
            status: "error",
            message: "فیلد ایمیل کاربر الزامی است"
        }
    }

    const pattern = /^(\+98|0)?9\d{9}$/i;
    if (cellphone === '' || !pattern.test(cellphone)) {
        return {
            status: "error",
            message: "فیلد شماره تماس کاربر نامعتبر است."
        }
    }

    const data = await putFetch(`/users/${id}`, { name, email, cellphone, password })

    if (data.status === 'success') {
        revalidatePath('/users');

        return {
            status: data.status,
            message: "کاربر مورد نظر ویرایش شد",
        }
    } else {
        return {
            status: data.status,
            message: handleError(data.message),
        }
    }
}