"use client"
import Image from "next/image"
import { numberFormat } from "@/utils/helper"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice"
import { toast } from "react-toastify"

export default function ProductBox({ product }) {

    const dispatch = useDispatch()

    function handleAddToCart(product) {

        dispatch(removeFromCart(product.id))

        dispatch(addToCart({ product, qty: 1 }))

        toast.success("محصول به سبد خرید اضافه شد")
    }

    return (
        <div className="box">
            <div>
                <div className="img-box">
                    <Image src={product.primary_image}
                        width="100"
                        height="65"
                        sizes="100vw"
                        style={{
                            width: "100%",
                            height: "auto"
                        }}
                        alt="food"
                    // placeholder="blur"
                    // blurDataURL=""
                    />
                </div>
                <div className="detail-box">
                    <h5>
                        <Link href={`/products/${product.slug}`}>
                            {product.name}
                        </Link>
                    </h5>
                    <p>{product.description}</p>
                    <div className="options">
                        <h6>
                            {product.is_sale ? (
                                <>
                                    <span className="">{numberFormat(product.sale_price)}</span>
                                    <del className="me-1">{numberFormat(product.price)}</del>
                                </>
                            ) : (
                                <>
                                    <span>{numberFormat(product.price)}</span>
                                </>
                            )}
                            <span className="ms-1">تومان</span>

                        </h6>
                        <button onClick={(e) => handleAddToCart(product)}>
                            <i className="bi bi-cart-fill text-white fs-5"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}