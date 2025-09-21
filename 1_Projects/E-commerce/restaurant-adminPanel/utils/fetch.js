import { cookies } from "next/headers"

export const getFetch = async (url) => {

    const userToken = (await cookies()).get('token')

    const response = await fetch(`${process.env.API_URL}${url}`, {
        cache: 'no-store',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${userToken.value}`,
        },
    })

    if (response.ok) {
        const data = await response.json()
        return data.data
    } else {
        throw new Error(`مشکل در دریافت اطلاعات کد : ${response.status}`)
    }
}

export const postFetch = async (url, body, headers = {}) => {

    const response = await fetch(`${process.env.API_URL}${url}`, {
        cache: 'no-store',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...headers
        },
        body: JSON.stringify(body)
    })

    const data = await response.json()

    return data

}

export const deleteFetch = async (url) => {

    const userToken = (await cookies()).get('token')

    const response = await fetch(`${process.env.API_URL}${url}`, {
        cache: 'no-store',
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${userToken.value}`,
        }
    })

    const data = await response.json()

    return data

}

export const putFetch = async (url, body) => {

    const userToken = (await cookies()).get('token')

    const response = await fetch(`${process.env.API_URL}${url}`, {
        cache: 'no-store',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${userToken.value}`,
        },
        body: JSON.stringify(body)
    })

    const data = await response.json()

    return data

}