"use server";

import { cookies } from 'next/headers';
import { handleError } from "@/utils/helper";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteFetch } from '@/utils/fetch';

async function createProduct(state, formData) {

    const primary_image = formData.get('primary_image');
    const name = formData.get('name');
    const category_id = formData.get('category_id');
    const price = formData.get('price');
    const quantity = formData.get('quantity');

    if (primary_image.size === 0) {
        return {
            status: "error",
            message: "تصویر اصلی الزامی است"
        }
    }

    if (name === '') {
        return {
            status: "error",
            message: "نام الزامی است"
        }
    }

    if (category_id === null) {
        return {
            status: "error",
            message: "دسته بندی الزامی است"
        }
    }

    if (price === '') {
        return {
            status: "error",
            message: "قیمت الزامی است"
        }
    }

    if (quantity === '') {
        return {
            status: "error",
            message: "تعداد الزامی است"
        }
    }

    const userToken = (await cookies()).get('token')

    if (!userToken) {

        return {
            status: "error",
            message: "undefined user_token!"
        }
    }

    const res = await fetch(`${process.env.API_URL}/products`, {
        cache: 'no-store',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${userToken.value}`
        },
        body: formData
    });

    const data = await res.json();

    if (data.status === 'success') {
        revalidatePath('/products');

        return {
            status: data.status,
            message: "محصول مورد نظر ایجاد شد",
        }
    } else {
        return {
            status: data.status,
            message: handleError(data.message),
        }
    }
}

async function deleteProduct(state, formData) {
    const id = formData.get('id');

    if (id === '' || id === null) {
        return {
            status: "error",
            message: "شناسه محصول الزامی است"
        }
    }

    const data = await deleteFetch(`/products/${id}`)

    if (data.status === 'success') {
        revalidatePath('/products');
        redirect('/products');
    } else {
        return {
            status: data.status,
            message: handleError(data.message),
        }
    }
}

async function editProduct(state, formData) {
    
    const id = formData.get('id');
    const primary_image = formData.get('primary_image');
    const images = formData.get('images[]');
    const name = formData.get('name');
    const category_id = formData.get('category_id');
    const price = formData.get('price');
    const quantity = formData.get('quantity');

    if (primary_image.size == 0) {
        formData.delete('primary_image')
    }

    if (images.size == 0) {
        formData.delete('images[]')
    }

    if (id === '' || id === null) {
        return {
            status: "error",
            message: "شناسه محصول الزامی است"
        }
    }

    if (name === '') {
        return {
            status: "error",
            message: "نام الزامی است"
        }
    }

    if (category_id === null) {
        return {
            status: "error",
            message: "دسته بندی الزامی است"
        }
    }

    if (price === '') {
        return {
            status: "error",
            message: "قیمت الزامی است"
        }
    }

    if (quantity === '') {
        return {
            status: "error",
            message: "تعداد الزامی است"
        }
    }

    const userToken = (await cookies()).get('token')

    if (!userToken) {

        return {
            status: "error",
            message: "undefined user_token!"
        }
    }

    const res = await fetch(`${process.env.API_URL}/products/${id}`, {
        cache: 'no-store',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${userToken.value}`
        },
        body: formData
    });

    const data = await res.json();

    if (data.status === 'success') {
        revalidatePath('/products');

        return {
            status: data.status,
            message: "محصول مورد نظر ویرایش شد",
        }
    } else {
        return {
            status: data.status,
            message: handleError(data.message),
        }
    }
}

export { createProduct, deleteProduct, editProduct }