import { getFetch } from "@/utils/fetch"
import ProductBox from "../products/ProductBox"
import Paginate from "./Paginate"


export default async function ProductsList({ params }) {

    
    
    const productsData = await getFetch(`/menu?${params}`)
    const products = productsData.products
    

    return (
        <>
            <div className="row gx-3">
                {products.map((product) => {
                    return (
                        <div key={product.id} className="col-sm-6 col-lg-4">
                            <ProductBox product={product} />
                        </div>)
                })}
            </div>

            <Paginate links={productsData.meta.links} />
        </>
    )
}