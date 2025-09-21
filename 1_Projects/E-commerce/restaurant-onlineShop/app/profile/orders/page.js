import Loading from "@/components/profile/orders/Loading";
import Table from "@/components/profile/orders/Table";
import { Suspense } from "react";


export default async function OrdersPage(props) {

    const searchParams = await props.searchParams


    const params = new URLSearchParams(searchParams)



    return (
        <Suspense key={params.toString()} fallback={<Loading />}>

            <Table params={params.toString()} />
        </Suspense>
    )
}