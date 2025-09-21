"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathName = usePathname()
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className={pathName === '/' ? "nav-link active" : "nav-link"} aria-current="page" href="/">
                            <i className="bi bi-grid me-2"></i>
                            داشبورد
                        </Link>
                    </li>
                    <li className={pathName.includes('/users') ? "nav-link active" : "nav-link"}>
                        <Link className="nav-link" href="/users">
                            <i className="bi bi-people me-2"></i>
                            کاربران
                        </Link>
                    </li>
                    <li className={pathName.includes('/products') ? "nav-link active" : "nav-link"}>
                        <Link className="nav-link" href="/products">
                            <i className="bi bi-box-seam me-2"></i>
                            محصولات
                        </Link>
                    </li>
                    <li className={pathName.includes('/categories') ? "nav-link active" : "nav-link"}>
                        <Link className="nav-link" href="/categories">
                            <i className="bi bi-grid-3x3-gap me-2"></i>
                            دسته بندی
                        </Link>
                    </li>
                    <li className={pathName.includes('/orders') ? "nav-link active" : "nav-link"}>
                        <Link className="nav-link" href="/orders">
                            <i className="bi bi-basket me-2"></i>
                            سفارشات
                        </Link>
                    </li>
                    <li className={pathName.includes('/transactions') ? "nav-link active" : "nav-link"}>
                        <Link className="nav-link" href="/transactions">
                            <i className="bi bi-currency-dollar me-2"></i>
                            تراکنش ها
                        </Link>
                    </li>
                    <li className={pathName.includes('/coupons') ? "nav-link active" : "nav-link"}>
                        <Link className="nav-link" href="/coupons">
                            <i className="bi bi-percent me-2"></i>
                            تخفیف ها
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}