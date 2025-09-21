"use client"

import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createCoupon } from "@/actions/coupons";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import gregorian from "react-date-object/calendars/gregorian"
import gregorian_en from "react-date-object/locales/gregorian_en"
import Button from "@/components/Button";

export default function CreateCouponPage() {
    const [state, formAction, isPending] = useActionState(createCoupon, {});
    const router = useRouter();
    const [dateExpire, setDateExpire] = useState('');

    useEffect(() => {
        toast(state?.message, { type: `${state?.status}` });
        if (state?.status === 'success') {
            router.push("/coupons")
        }
    }, [state])

    function changeDateExpire(value) {
        setDateExpire(value.convert(gregorian, gregorian_en).format("YYYY-MM-DD HH:mm:ss"))
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h4 className="fw-bold">ایجاد تخفیف</h4>
            </div>

            <form action={formAction} className="row gy-4">
                <div className="col-md-3">
                    <label className="form-label">کد</label>
                    <input name='code' type="text" className="form-control" />
                </div>

                <div className="col-md-3">
                    <label className="form-label">درصد</label>
                    <input name='percentage' type="text" className="form-control" />
                </div>

                <div className="col-md-3">
                    <label className="form-label">تاریخ انقضا</label>
                    <DatePicker
                        inputClass="form-control"
                        calendar={persian}
                        locale={persian_fa}
                        onChange={changeDateExpire}
                        format="YYYY-MM-DD HH:mm:ss"
                    />

                    <input name='expired_at' value={dateExpire} type="hidden" />
                </div>

                <div>
                    <Button title="ایجاد تخفیف" style="btn btn-outline-dark mt-3" isPending={isPending} />
                </div>
            </form>
        </>
    )
}