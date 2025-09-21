import { getFetch } from "@/utils/fetch"
import { numberFormat } from "@/utils/helper"
import { cookies } from "next/headers"
import Paginate from "./Paginate"


export default async function Table({ params }) {

    const userToken = (await cookies()).get('token')

    if (!userToken) {
        return {
            status: "error",
            message: "undefined user_token!"
        }
    }

    const transData = await getFetch(`/profile/transactions?${params}`, {
        'Authorization': `Bearer ${userToken.value}`
    })

    return (
        <>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th>شماره سفارش</th>
                            <th>مبلغ</th>
                            <th>وضعیت</th>
                            <th>شماره پیگیری</th>
                            <th>تاریخ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transData.transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <th>
                                    {transaction.order_id}
                                </th>
                                <td>{numberFormat(transaction.amount)} تومان</td>
                                <td>
                                    <span className={transaction.status == 'موفق' ? "text-success" : "text-danger"}>{transaction.status}</span>
                                </td>
                                <td>{transaction.trans_id}</td>
                                <td>{transaction.created_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Paginate links={transData.meta.links} />
        </>
    )
}