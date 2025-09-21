import Loading from "@/components/Loading";
import TableUser from "@/components/users/TableUser";
import Link from "next/link";
import { Suspense } from "react";

export default async function UsersPage(props) {

    const searchParams = await props.searchParams

    const qParam = new URLSearchParams(searchParams)

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h4 className="fw-bold">کاربران</h4>
                <Link href={`/users/create`} className="btn btn-sm btn-outline-dark">ایجاد کاربر</Link>
            </div>

            <Suspense key={qParam.toString()} fallback={<Loading />}>
                <TableUser qParam={qParam.toString()} />
            </Suspense>
        </>
    )
}