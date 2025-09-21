"use server"

import { getFetch, postFetch } from "@/utils/fetch"
import { handleError } from "@/utils/helper"
import { cookies } from "next/headers"


export async function checkCoupon(state, formData) {

    const coupon_code = formData.get("coupon_code")

    if (coupon_code === '') {
        return {
            status: "error",
            message: "کد تخفیف را وارد کنید!"
        }
    }

    const userToken = (await cookies()).get('token')

    if (!userToken) {
        return {
            status: "error",
            message: "undefined user_token!"
        }
    }

    const data = await postFetch("/check-coupon",
        { code: coupon_code },
        { 'Authorization': `Bearer ${userToken.value}` }
    )

    if (data.status === 'success') {
        return {
            status: data.status,
            message: "کد تخفیف با موفقیت اعمال شد",
            percentage: data.data.percentage,
            coupon_code
        }
    } else {
        return {
            status: data.status,
            message: handleError(data.message)
        }
    }
}

export async function getAddresses() {
    const token = (await cookies()).get('token');
    return await getFetch('/user/addresses', { 'Authorization': `Bearer ${token.value}` });
}

export async function payment(state, formData) {

    const cart = formData.get("cart")
    const coupon = formData.get("coupon")
    const address_id = formData.get("address_id")

    if (address_id === "") {
        return {
            status: "error",
            message: "انتخاب آدرس الزامی است"
        }
    }

    const userToken = (await cookies()).get('token')

    if (!userToken) {
        return {
            status: "error",
            message: "undefined user_token!"
        }
    }

    const data = await postFetch("/payment/send",
        {
            cart: JSON.parse(cart),
            coupon,
            address_id
        },
        { 'Authorization': `Bearer ${userToken.value}` }
    )

    if (data.status === 'success') {
        return {
            status: data.status,
            message: "در حال انتقال به درگاه پرداخت",
            url: data.data.url
        }
    } else {
        return {
            status: data.status,
            message: handleError(data.message)
        }
    }
}

export async function paymentVerify(trackId, status) {

    const userToken = (await cookies()).get('token')

    if (!userToken) {
        return {
            status: "error",
            message: "undefined user_token!"
        }
    }

    const data = await postFetch("/payment/verify", {
        token: trackId,
        status
    }, { 'Authorization': `Bearer ${userToken.value}` })

    if (data.status === 'success') {
        return {
            status: data.status,
            payment: data.data
        }
    } else {
        return {
            status: data.status,
            message: handleError(data.message)
        }
    }
}
