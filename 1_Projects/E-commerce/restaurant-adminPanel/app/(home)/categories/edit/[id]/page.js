import EditCategory from "@/components/categories/Edit";
import { getFetch } from "@/utils/fetch";

export default async function EditCategoryPage(props) {

    const params = await props.params
    
    const category = await getFetch(`/categories/${params.id}`);

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h4 className="fw-bold">ویرایش دسته بندی: {category.name}</h4>
            </div>

            <EditCategory category={category} />
        </>
    )
}