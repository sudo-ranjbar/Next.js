"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function Search() {

    const [query, setQuery] = useState('')
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    function handleQuery(remove) {

        const params = new URLSearchParams(searchParams)

        params.delete('page')

        if (remove) {
            params.delete('search')
            setQuery('')
        } else {
            params.set('search', query)
        }

        router.replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div>
            <label className="form-label">جستجو</label>

            {searchParams.has('search') && <span onClick={() => handleQuery(true)} className="text-danger fs-3 cursor-pointer">
                <i className="bi bi-x"></i>
            </span>}

            <div className="input-group mb-3">
                <input onChange={(e) => setQuery(e.target.value)} value={query} type="text" className="form-control" placeholder="نام محصول ..." />
                <button onClick={() => query !== '' && handleQuery()} className="input-group-text">
                    <i className="bi bi-search"></i>
                </button>
            </div>
        </div>
    )
}