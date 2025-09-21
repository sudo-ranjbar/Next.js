"use client"

import { usePathname, useSearchParams, useRouter } from "next/navigation"

export default function Paginate({ links }) {

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    function handlePage(page) {
        const params = new URLSearchParams(searchParams)
        params.set('page', page)

        router.replace(`${pathname}?${params.toString()}`)
    }

    return (
        <nav className="d-flex justify-content-center mt-5">
            <ul className="pagination">
                {links.slice(1, -1).map((link, index) => (
                    <li key={index} className={link.active ? "page-item active" : "page-item"}>
                        <button className="page-link" onClick={() => handlePage(link.label)}>
                            {link.label}
                        </button>
                    </li>
                ))}

            </ul>
        </nav>
    )
}