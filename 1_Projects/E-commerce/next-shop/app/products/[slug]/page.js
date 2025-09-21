import ProductBox from "@/components/products/ProductBox"
import ShoppingCart from "@/components/products/ShoppingCart"
import { getFetch } from "@/utils/fetch"
import { discountPercent, numberFormat } from "@/utils/helper"
import Image from "next/image"


export default async function ProductSinglePage(prop) {

    const params = await prop.params

    const product = await getFetch(`/products/${decodeURI(params.slug)}`)
    const otherProduct = await getFetch(`/random-products?count=4`)

    return (
        <>
            <section className="single_page_section layout_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <div className="row gy-5">

                                <div className="col-sm-12 col-lg-6">
                                    <h3 className="fw-bold mb-4">{product.name}</h3>
                                    <h5 className="mb-3">
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
                                        {product.is_sale &&

                                            <div className="text-danger fs-6">
                                                {discountPercent(product.price, product.sale_price)}% تخفیف
                                            </div>
                                        }
                                    </h5>
                                    <p>{product.description}</p>

                                    <ShoppingCart product={product} />
                                </div>

                                <div className="col-sm-12 col-lg-6">
                                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">

                                        <div className="carousel-indicators">
                                            <button type="button" data-bs-target="#carouselExampleIndicators"
                                                data-bs-slide-to="0" className="active"></button>
                                            {product.images.map((img, index) => (
                                                <button key={index} type="button" data-bs-target="#carouselExampleIndicators"
                                                    data-bs-slide-to={index + 1}></button>
                                            ))}

                                        </div>

                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <Image src={product.primary_image}
                                                    className="d-block w-100"
                                                    width={464}
                                                    height={309}
                                                    style={{
                                                        width: "100%",
                                                        height: "auto"
                                                    }}
                                                    alt="product-primary-image" />
                                            </div>
                                            {product.images.map((img) => (
                                                <div className="carousel-item" key={img.id}>
                                                    <Image src={img.image}
                                                        className="d-block w-100"
                                                        width={464}
                                                        height={309}
                                                        style={{
                                                            width: "100%",
                                                            height: "auto"
                                                        }}
                                                        alt="product-image" />
                                                </div>
                                            ))}

                                        </div>

                                        <button className="carousel-control-prev" type="button"
                                            data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button"
                                            data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                            <span className="carousel-control-next-icon"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <hr />

            <section className="food_section my-5">
                <div className="container">
                    <div className="row gx-3">

                        {otherProduct.map((randProd, index) => (
                            <div key={index} className="col-sm-6 col-lg-3">
                                <ProductBox product={randProd} />
                            </div>
                        ))}

                    </div>
                </div>
            </section>
        </>
    )
}