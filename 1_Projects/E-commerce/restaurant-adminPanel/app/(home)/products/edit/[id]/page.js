import EditProduct from "@/components/products/Edit";
import { getFetch } from "@/utils/fetch";

export default async function EditProductPage(props) {
    
    const params = await props.params

    const product = await getFetch(`/products/${params.id}`);

    const categories = await getFetch("/categories-list");

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h4 className="fw-bold">ویرایش محصول: {product.name}</h4>
            </div>

            <EditProduct product={product} categories={categories} />
        </>
    )
}