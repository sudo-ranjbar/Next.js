import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"
import Button from "../Button"
import { checkCoupon } from "@/actions/cart"

export default function Coupon({ setCoupon }) {

    const [state, formAction, isPending] = useActionState(checkCoupon, {})

    useEffect(() => {
        toast(state?.message, { type: `${state?.status}` })
        
        if(state?.status == "success"){
            setCoupon({
                code: state.coupon_code,
                percent: state.percentage
            })
        }
    }, [state])

    return (
        <form action={formAction} className="col-12 col-md-6">
            <div className="input-group mb-3">
                <input name="coupon_code" type="text" className="form-control" placeholder="کد تخفیف" />
                <Button title="اعمال کد تخفیف" style="input-group-text" isPending={isPending} />
            </div>
        </form>
    )
}