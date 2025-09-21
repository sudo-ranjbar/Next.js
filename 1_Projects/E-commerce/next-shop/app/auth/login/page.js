"use client"
import LoginForm from "@/components/auth/LoginForm"
import OtpVerificationForm from "@/components/auth/otpVerificationForm"
import { useState } from "react"

export default function LoginPage() {

    const [step, setStep] = useState(1)

    return (
        <section className="auth_section book_section">
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-md-6 col-lg-4">

                        {step == 1 && <LoginForm setStep={setStep} />}

                        {step == 2 && <OtpVerificationForm />}

                    </div>
                </div>
            </div>
        </section>
    )
}