import EditCoupon from "@/components/coupons/Edit";
import { getFetch } from "@/utils/fetch";

export default async function EditCouponPage({ params }) {
    const coupon = await getFetch(`/coupons/${params.id}`);

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h4 className="fw-bold">ویرایش کد تخفیف: {coupon.code}</h4>
            </div>

            <EditCoupon coupon={coupon} />
        </>
    )
}