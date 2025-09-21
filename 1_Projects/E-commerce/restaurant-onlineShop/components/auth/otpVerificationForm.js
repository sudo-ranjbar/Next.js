"use client"
import Button from "../Button";
import { otpCheck } from "@/actions/auth"
import AuthContext from "@/context/AuthContext";
import { useActionState, useContext, useEffect } from "react"
import { toast } from "react-toastify"
import ResendOtpButton from "./ResendOtpButton";
import { useRouter } from "next/navigation";

export default function OtpVerificationForm() {

    const [state_otp, formAction_otp, isPending] = useActionState(otpCheck, {})

    const { loginContext } = useContext(AuthContext)

    const router = useRouter()

    useEffect(() => {

        toast(state_otp?.message, { type: `${state_otp?.status}` })

        if (state_otp?.status === "success") {
            loginContext(state_otp.user)
            router.push("/")
        }

    }, [state_otp])

    return (
        <div className="card">
            <div className="card-body">
                <div className="form_container">

                    <form action={formAction_otp}>
                        <div className="mb-3">
                            <label className="form-label">کد تایید ارسال شده را وارد کنید</label>
                            <input name="otp" type="text" className="form-control" />
                        </div>
                        <Button title="تایید" ispending={isPending} style="btn btn-primary btn-auth" />
                    </form>

                    <ResendOtpButton />

                </div>
            </div>
        </div>
    )
}