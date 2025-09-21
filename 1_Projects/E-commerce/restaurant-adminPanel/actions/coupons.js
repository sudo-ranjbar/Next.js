"use server";

import { deleteFetch, postFetch, putFetch } from "@/utils/fetch";
import { handleError } from "@/utils/helper";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function createCoupon(state, formData) {
    const code = formData.get('code');
    const percentage = formData.get('percentage');
    const expired_at = formData.get('expired_at');

    if (code === '') {
        return {
            status: "error",
            message: "فیلد کد تخفیف الزامی است"
        }
    }

    if (percentage === '') {
        return {
            status: "error",
            message: "فیلد درصد الزامی است"
        }
    }

    if (expired_at === '') {
        return {
            status: "error",
            message: "فیلد تاریخ انقضا الزامی است"
        }
    }

    const userToken = (await cookies()).get('token')

    if (!userToken) {

        return {
            status: "error",
            message: "undefined user_token!"
        }
    }

    const data = await postFetch("/coupons", { code, percentage, expired_at }, { 'Authorization': `Bearer ${userToken.value}` })

    if (data.status === 'success') {
        revalidatePath('/coupons');

        return {
            status: data.status,
            message: "کد تخفیف مورد نظر ایجاد شد",
        }
    } else {
        return {
            status: data.status,
            message: handleError(data.message),
        }
    }
}

async function deleteCoupon(state, formData) {

    const id = formData.get('id');

    if (id === '' || id === null) {
        return {
            status: "error",
            message: "شناسه تخفیف الزامی است"
        }
    }

    const data = await deleteFetch(`/coupons/${id}`)

    if (data.status === 'success') {

        revalidatePath('/coupons');
        redirect('/coupons');

    } else {

        return {
            status: data.status,
            message: handleError(data.message),
        }

    }
}

async function editCoupon(state, formData) {
    const id = formData.get('id');
    const code = formData.get('code');
    const percentage = formData.get('percentage');
    const expired_at = formData.get('expired_at');

    if (id === '' || id === null) {
        return {
            status: "error",
            message: "شناسه کد تخفیف الزامی است"
        }
    }

    if (code === '') {
        return {
            status: "error",
            message: "فیلد کد تخفیف الزامی است"
        }
    }

    if (percentage === '') {
        return {
            status: "error",
            message: "فیلد درصد الزامی است"
        }
    }

    const data = await putFetch(`/coupons/${id}`, { code, percentage, expired_at })

    if (data.status === 'success') {
        revalidatePath('/coupons');

        return {
            status: data.status,
            message: "کد تخفیف مورد نظر ویرایش شد",
        }
    } else {
        return {
            status: data.status,
            message: handleError(data.message),
        }
    }
}

export { createCoupon, deleteCoupon, editCoupon }