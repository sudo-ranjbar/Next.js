import EditForm from "@/components/profile/info/EditForm"
import { getFetch } from "@/utils/fetch"
import { cookies } from "next/headers"


export default async function ProfilePage() {

    const userToken = (await cookies()).get('token')

    if (!userToken) {
        return {
            status: "error",
            message: "undefined user_token!"
        }
    }

    const userInfo = await getFetch("/profile/info", {
        'Authorization': `Bearer ${userToken.value}`
    })

    return (
        <div className="vh-70">
            <EditForm userInfo={userInfo} />
        </div>
    )
}