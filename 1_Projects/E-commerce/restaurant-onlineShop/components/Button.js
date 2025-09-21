"use client"

export default function Button({ title, isPending, style }) {

    return (
        <button type="submit" disabled={isPending} className={style}>
            {title}
            {isPending && <div className="spinner-border spinner-border-sm ms-2"></div>}
        </button>
    )
}