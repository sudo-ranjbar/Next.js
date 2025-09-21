"use server"

import { postFetch } from "@/utils/fetch"
import { handleError } from "@/utils/helper"
import { cookies } from "next/headers"

export async function login(state_login, formData) {

    const email = formData.get('email')
    const password = formData.get('password')

    if (email === '' || password === '') {
        return {
            status: "error",
            message: "ایمیل و رمز عبور الزامی است"
        }
    }

    const data = await postFetch("/auth/login", { email, password }, {})


    if (data.status === 'success') {
        (await cookies()).set(
            {
                name: 'token',
                value: data.data.token,
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 72 // 5 minutes
            }
        )

        return {
            status: data.status,
            message: "شما با موفقیت وارد پنل ادمین شدید"
        }
    } else {
        return {
            status: data.status,
            message: handleError(data.message)
        }
    }
}

export async function me() {

    const userToken = (await cookies()).get('token')

    if (!userToken) {
        return {
            status: "error",
            message: "undefined user_token!"
        }
    }

    const data = await postFetch("/auth/me", {}, {
        'Authorization': `Bearer ${userToken.value}`
    })

    if (data.status === 'success') {
        return {
            user: data.data
        }
    } else {
        return {
            error: "User Forbidden"
        }
    }
}

export async function logout() {

    const userToken = (await cookies()).get('token')

    if (!userToken) {
        return {
            status: "error",
            message: "undefined user_token!"
        }
    }

    const data = await postFetch("/auth/logout", {}, {
        'Authorization': `Bearer ${userToken.value}`
    })

    if (data.status === 'success') {
        (await cookies()).delete('token');

        return {
            success: "شما از حساب خود خارج شدید"
        }
    } else {
        return {
            error: "User Forbidden"
        }
    }
}