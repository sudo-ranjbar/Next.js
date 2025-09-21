"use client"

import Image from "next/image";
import heroImg from "@/public/images/hero-bg.jpg"
import Slider from "./Slider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { useSelector } from "react-redux";

export default function Header() {

    const pathname = usePathname();

    const { user } = useContext(AuthContext)

    const state = useSelector(state => state.shoppingCart)

    return (
        <div className={pathname === "/" ? "" : "sub_page"}>
            <div className="hero_area">

                <div className="bg-box">
                    <Image src={heroImg} alt="hero-image" priority />
                </div>

                <header className="header_section">
                    <div className="container">
                        <nav className="navbar navbar-expand-lg custom_nav-container">
                            <Link className="navbar-brand" href="/">
                                <span>
                                    webprog.io
                                </span>
                            </Link>

                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mx-auto">
                                    <li className={pathname === "/" ? "nav-item active" : "nav-item"}>
                                        <Link className="nav-link" href="/">صفحه اصلی</Link>
                                    </li>
                                    <li className={pathname === "/menu" ? "nav-item active" : "nav-item"}>
                                        <Link className="nav-link" href="/menu">منو</Link>
                                    </li>
                                    <li className={pathname === "/about" ? "nav-item active" : "nav-item"}>
                                        <Link className="nav-link" href="/about">درباره ما</Link>
                                    </li>
                                    <li className={pathname === "/contact" ? "nav-item active" : "nav-item"}>
                                        <Link className="nav-link" href="/contact">تماس باما</Link>
                                    </li>
                                </ul>

                                <div className="user_option">
                                    <Link className="cart_link position-relative" href="/cart">
                                        <i className="bi bi-cart-fill text-white fs-5"></i>
                                        <span className="position-absolute top-0 translate-middle badge rounded-pill">
                                            {state.cart.length}
                                        </span>
                                    </Link>
                                    {user ? (
                                        <>
                                            <Link href="/profile" className="btn-auth">
                                                {user.name}
                                            </Link>
                                            <span className="btn btn-dark">Logout</span>
                                        </>
                                    ) : (
                                        <Link href="/auth/login" className="btn-auth">
                                            ورود
                                        </Link>
                                    )}

                                </div>

                            </div>
                        </nav>
                    </div>
                </header>

                {pathname === "/" && <Slider />}
            </div>
        </div>
    )
}