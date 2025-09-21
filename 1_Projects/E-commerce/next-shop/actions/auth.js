"use server"

import { postFetch } from "@/utils/fetch"
import { handleError } from "@/utils/helper"
import { cookies } from "next/headers"

export async function login(state_login, formData) {

    const phone = formData.get('phone')

    if (phone === '') {
        return {
            status: "error",
            message: "شماره خود را وارد کنید"
        }
    }

    const phonePattern = /^(\+98|0)?9\d{9}$/;

    if (!phonePattern.test(phone)) {
        return {
            status: "error",
            message: "فرمت شماره موبایل معتبر نیست. فرمت صحیح 09xxxxxxxxx"
        }
    }
    const data = await postFetch("/auth/login", {
        cellphone: phone
    })

    if (data.status === 'success') {
        (await cookies()).set(
            {
                name: 'login_token',
                value: data.data.login_token,
                httpOnly: true,
                path: '/',
                maxAge: 60 * 5 // 5 minutes
            }
        )

        return {
            status: data.status,
            message: "کد تایید با موفقیت ارسال شد!"
        }
    } else {
        return {
            status: data.status,
            message: handleError(data.message)
        }
    }
}

export async function otpCheck(state_otp, formData) {
    const otp = formData.get('otp')

    if (otp === '') {
        return {
            status: "error",
            message: "رمز یکبار مصرف را وارد کنید"
        }
    }

    const otpPattern = /^[0-9]{6}$/;

    if (!otpPattern.test(otp)) {
        return {
            status: "error",
            message: "رمز یکبار مصرف باید 6 رقم باشد"
        }
    }

    const loginToken = (await cookies()).get('login_token')

    if (!loginToken) {
        return {
            status: "error",
            message: "undefined login_token!"
        }
    }

    const data = await postFetch("/auth/check-otp", {
        otp,
        login_token: loginToken.value
    })

    if (data.status === 'success') {
        (await cookies()).delete('login_token');

        (await cookies()).set(
            {
                name: 'token',
                value: data.data.token,
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 7 // 1 week
            }
        )

        return {
            status: data.status,
            message: "ورود کاربر با موفقیت",
            user: data.data.user
        }
    } else {
        return {
            status: data.status,
            message: handleError(data.message)
        }
    }
}

export async function resendOtp(state_resend, formData) {
    const loginToken = (await cookies()).get('login_token')

    if (!loginToken) {
        return {
            status: "error",
            message: "undefined user_token!"
        }
    }

    const data = await postFetch("/auth/resend-otp", {
        login_token: loginToken.value
    })

    if (data.status === 'success') {
        (await cookies()).set(
            {
                name: 'login_token',
                value: data.data.login_token,
                httpOnly: true,
                path: '/',
                maxAge: 60 * 5
            }
        )

        return {
            status: data.status,
            message: "کد ورود دوباره ارسال شد"
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