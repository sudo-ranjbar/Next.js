import CategoriesList from "@/components/menu/CategoriesList"
import Loading from "@/components/menu/loading"
import ProductsList from "@/components/menu/ProductsList"
import Search from "@/components/menu/Search"
import SortBy from "@/components/menu/SortBy"
import { getFetch } from "@/utils/fetch"
import { Suspense } from "react"


export default async function MenuPage(props) {

    const searchParams = await props.searchParams
    
    const params = new URLSearchParams(searchParams)

    const categories = await getFetch("/categories")

    return (
        <section className="food_section layout_padding">
            <div className="container">
                <div className="row">

                    <div className="col-sm-12 col-lg-3">
                        <Search />

                        <hr />

                        <CategoriesList categories={categories} />

                        <hr />

                        <SortBy/>
                    </div>

                    <div className="col-sm-12 col-lg-9">
                        <Suspense key={params.toString()} fallback={<Loading />}>
                            <ProductsList params={params.toString()} />
                        </Suspense>
                    </div>

                </div>
            </div>
        </section>
    )
}