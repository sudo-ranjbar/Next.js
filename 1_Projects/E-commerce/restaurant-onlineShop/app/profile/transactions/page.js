import Loading from "@/components/profile/transactions/Loading";
import Table from "@/components/profile/transactions/Table";
import { Suspense } from "react";


export default async function TransactionsPage(props) {

    const searchParams = await props.searchParams


    const params = new URLSearchParams(searchParams)



    return (
        <Suspense key={params.toString()} fallback={<Loading />}>

            <Table params={params.toString()} />
        </Suspense>
    )
}