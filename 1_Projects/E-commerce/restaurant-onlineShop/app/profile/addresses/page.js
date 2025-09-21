import CreateForm from "@/components/profile/addresses/CreateForm";
import EditForm from "@/components/profile/addresses/EditForm";
import { getFetch } from "@/utils/fetch";
import { cookies } from "next/headers";


export default async function Address() {

    const userToken = (await cookies()).get('token')

    if (!userToken) {
        return {
            status: "error",
            message: "undefined user_token!"
        }
    }

    const { addresses, provinces, cities } = await getFetch("/profile/addresses", {
        'Authorization': `Bearer ${userToken.value}`
    })

    return (
        <>
            <CreateForm provinces={provinces} cities={cities} />

            <hr />

            {addresses.map(address => (
                <EditForm key={address.id} address={address} provinces={provinces} cities={cities} />
            ))}
        </>
    )
}