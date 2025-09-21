"use client"

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { createProduct } from "@/actions/products";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import gregorian from "react-date-object/calendars/gregorian"
import gregorian_en from "react-date-object/locales/gregorian_en"
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel"


export default function CreateProduct({ categories }) {

    const [state, formAction, isPending] = useActionState(createProduct, {});
    const router = useRouter();
    const [image, setImage] = useState(null);
    const primaryImageRef = useRef();
    const [dateOnSale, setDateOnSale] = useState([]);

    useEffect(() => {
        toast(state?.message, { type: `${state?.status}` });
        if (state?.status === 'success') {
            router.push("/products")
        }
    }, [state])

    function setPrimaryImage(e) {
        const file = e.target.files[0];

        const render = new FileReader();
        render.readAsDataURL(file);

        render.onloadend = () => {
            setImage(render.result.toString());
        }
    }

    function changeDateOnSale(value) {
        if (value.length == 2) {
            setDateOnSale([
                value[0].convert(gregorian, gregorian_en).format("YYYY-MM-DD HH:mm:ss"),
                value[1].convert(gregorian, gregorian_en).format("YYYY-MM-DD HH:mm:ss")
            ])
        }
    }

    return (
        <form action={formAction} className="row gy-4">

            <div className="col-md-12 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <label className="form-label">تصویر اصلی</label>

                        <div className={image ? "position-relative" : "d-none"}>
                            <img className="rounded" src={image} width={350} height={220} alt="image" />
                            <div className="position-absolute" onClick={() => { primaryImageRef.current.value = ""; setImage(null) }} style={{ top: '5px', right: '15px' }}>
                                <i className="bi bi-x text-danger fs-2 cursor-pointer"></i>
                            </div>
                        </div>

                        <input onChange={setPrimaryImage} name="primary_image" type="file" ref={primaryImageRef} className={image === null ? "form-control" : "d-none"} />
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <label className="form-label">تصاویر</label>
                <input multiple name='images[]' type="file" className="form-control" />
            </div>

            <div className="col-md-3">
                <label className="form-label">نام</label>
                <input name='name' type="text" className="form-control" />
            </div>

            <div className="col-md-3">
                <label className="form-label">دسته بندی</label>
                <select name='category_id' defaultValue="" className="form-select" >
                    <option value="" disabled >انتخاب دسته بندی</option>
                    {categories.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
            </div>

            <div className="col-md-3">
                <label className="form-label">وضعیت</label>
                <select name='status' defaultValue="1" className="form-select" >
                    <option value="1" >فعال</option>
                    <option value="0" >غیر فعال</option>
                </select>
            </div>

            <div className="col-md-3">
                <label className="form-label">قیمت</label>
                <input name='price' type="text" className="form-control" />
            </div>

            <div className="col-md-3">
                <label className="form-label">تعداد</label>
                <input name='quantity' type="text" className="form-control" />
            </div>

            <div className="col-md-3">
                <label className="form-label">قیمت حراجی</label>
                <input name='sale_price' type="text" className="form-control" />
            </div>

            <div className="col-md-3">
                <label className="form-label">تاریخ شروع و پایان حراجی</label>
                <DatePicker
                    inputClass="form-control"
                    range
                    dateSeparator=" تا " 
                    calendar={persian}
                    locale={persian_fa}
                    onChange={changeDateOnSale}
                    format="YYYY-MM-DD HH:mm:ss"
                    plugins={[
                        <TimePicker key={`TimePicker`} position="bottom" />,
                        <DatePanel key={`DatePanel`} markFocused />
                    ]}
                />

                <input name='date_on_sale_from' value={dateOnSale[0]} type="hidden" />
                <input name='date_on_sale_to' value={dateOnSale[1]} type="hidden" />
            </div>

            <div className="col-md-12">
                <label className="form-label">توضیحات</label>
                <textarea rows="5" name='description' className="form-control"></textarea>
            </div>

            <div>
                <Button title="ایجاد محصول" style="btn btn-outline-dark mt-3 mb-4" isPending={isPending}/>
            </div>
        </form>
    )
}