"use client"

import { usePathname, useSearchParams, useRouter } from "next/navigation"

export default function SortBy() {

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    function handleClick(value) {

        const params = new URLSearchParams(searchParams)

        params.set('sortBy', value)

        params.delete('page')

        router.replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div>
            <label className="form-label">مرتب سازی</label>
            <div className="form-check my-2">
                <input onChange={() => handleClick('max')}
                    className="form-check-input" type="radio" name="flexRadioDefault" id="max"
                    checked={searchParams.has('sortBy') && searchParams.get('sortBy') === 'max'}
                />
                <label className="form-check-label cursor-pointer" htmlFor="max">
                    بیشترین قیمت
                </label>
            </div>
            <div className="form-check my-2">
                <input onChange={() => handleClick('min')}
                    className="form-check-input" type="radio" name="flexRadioDefault" id="min"
                    checked={searchParams.has('sortBy') && searchParams.get('sortBy') === 'min'}
                />
                <label className="form-check-label cursor-pointer" htmlFor="min">
                    کمترین قیمت
                </label>
            </div>
            <div className="form-check my-2">
                <input onChange={() => handleClick('bestseller')}
                    className="form-check-input" type="radio" name="flexRadioDefault" id="bestseller"
                    checked={searchParams.has('sortBy') && searchParams.get('sortBy') === 'bestseller'}
                />
                <label className="form-check-label cursor-pointer" htmlFor="bestseller">
                    پرفروش ترین
                </label>
            </div>
            <div className="form-check my-2">
                <input onChange={() => handleClick('sale')}
                    className="form-check-input" type="radio" name="flexRadioDefault" id="sale"
                    checked={searchParams.has('sortBy') && searchParams.get('sortBy') === 'sale'}
                />
                <label className="form-check-label cursor-pointer" htmlFor="sale">
                    با تخفیف
                </label>
            </div>
        </div>
    )
}