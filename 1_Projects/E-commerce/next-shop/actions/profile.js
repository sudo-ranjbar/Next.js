"use server"

import { postFetch } from "@/utils/fetch"
import { handleError } from "@/utils/helper"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function editForm(state, formData) {

    const name = formData.get("name")
    const email = formData.get("email")

    if (name === '') {
        return {
            status: "error",
            message: "فیلد نام نباید خالی باشد"
        }
    }

    if (email === '') {
        return {
            status: "error",
            message: "فیلد ایمیل نباید خالی باشد"
        }
    }

    const userToken = (await cookies()).get('token')

    if (!userToken) {
        return {
            status: "error",
            message: "undefined user_token!"
        }
    }

    const data = await postFetch("/profile/info/edit",
        { name, email },
        { 'Authorization': `Bearer ${userToken.value}` }
    )

    if (data.status === 'success') {
        return {
            status: data.status,
            message: "ویرایش اطلاعات با موفقیت انجام شد"
        }
    } else {
        return {
            status: data.status,
            message: handleError(data.message)
        }
    }
}

export async function createAddress(stateCreate, formData) {

    const title = formData.get("title")
    const contactPhone = formData.get("contactPhone")
    const zipCode = formData.get("zipCode")
    const province = formData.get("province")
    const city = formData.get("city")
    const locationAddress = formData.get("locationAddress")

    if (title === "") {
        return {
            status: "error",
            message: "فیلد عنوان الزامی است"
        }
    }

    const phonePattern = /^(\=98|0)?9\d{9}$/i;

    if (contactPhone === '' || !phonePattern.test(contactPhone)) {
        return {
            status: "error",
            message: "فیلد شماره تلفن نامعتبر است"
        }
    }

    // const zipCodePattern = /^\d{5}[ -]?\d{5}$/i;

    if (zipCode === '') {
        return {
            status: "error",
            message: "فیلد کد پستی نامعتبر است"
        }
    }

    if (locationAddress === "") {
        return {
            status: "error",
            message: "فیلد آدرس الزامی است"
        }
    }

    const userToken = (await cookies()).get('token')

    if (!userToken) {
        return {
            status: "error",
            message: "undefined user_token!"
        }
    }

    const data = await postFetch("/profile/addresses/create",
        {
            title: title,
            cellphone: contactPhone,
            postal_code: zipCode,
            province_id: province,
            city_id: city,
            address: locationAddress
        },
        { 'Authorization': `Bearer ${userToken.value}` }
    )

    if (data.status === 'success') {
        revalidatePath("/profile/addresses")
        return {
            status: data.status,
            message: "ثبت آدرس با موفقیت انجام شد"
        }
    } else {
        return {
            status: data.status,
            message: handleError(data.message)
        }
    }


}

export async function editAddress(stateEdit, formData) {

    const title = formData.get("title")
    const contactPhone = formData.get("contactPhone")
    const zipCode = formData.get("zipCode")
    const province = formData.get("province")
    const city = formData.get("city")
    const locationAddress = formData.get("locationAddress")
    const address_id = formData.get("address_id")

    if (title === "") {
        return {
            status: "error",
            message: "فیلد عنوان الزامی است"
        }
    }

    const phonePattern = /^(\=98|0)?9\d{9}$/i;

    if (contactPhone === '' || !phonePattern.test(contactPhone)) {
        return {
            status: "error",
            message: "فیلد شماره تلفن نامعتبر است"
        }
    }

    // const zipCodePattern = /^\d{5}[ -]?\d{5}$/i;

    if (zipCode === '') {
        return {
            status: "error",
            message: "فیلد کد پستی نامعتبر است"
        }
    }

    if (locationAddress === "") {
        return {
            status: "error",
            message: "فیلد آدرس الزامی است"
        }
    }

    const userToken = (await cookies()).get('token')

    if (!userToken) {
        return {
            status: "error",
            message: "undefined user_token!"
        }
    }

    const data = await postFetch("/profile/addresses/edit",
        {
            title: title,
            cellphone: contactPhone,
            postal_code: zipCode,
            province_id: province,
            city_id: city,
            address: locationAddress,
            address_id
        },
        { 'Authorization': `Bearer ${userToken.value}` }
    )

    if (data.status === 'success') {
        revalidatePath("/profile/addresses")
        return {
            status: data.status,
            message: "ویرایش آدرس با موفقیت انجام شد"
        }
    } else {
        return {
            status: data.status,
            message: handleError(data.message)
        }
    }


}

export async function deleteAddress(stateDelete, formData) {

    const address_id = formData.get("address_id")

    const userToken = (await cookies()).get('token')

    if (!userToken) {
        return {
            status: "error",
            message: "undefined user_token!"
        }
    }


    /**
     * if an address is not removable it means that
     * the address is set to an ongoing order and cannot be deleted
     * at the moment.
     * the error is : شناسه آدرس قبلا انتخاب شده است */ 

    const data = await postFetch("/profile/addresses/delete",
        {
            address_id
        },
        { 'Authorization': `Bearer ${userToken.value}` }
    )

    if (data.status === 'success') {
        revalidatePath("/profile/addresses")
        return {
            status: data.status,
            message: "حذف آدرس با موفقیت انجام شد"
        }
    } else {
        return {
            status: data.status,
            message: handleError(data.message)
        }
    }
}
