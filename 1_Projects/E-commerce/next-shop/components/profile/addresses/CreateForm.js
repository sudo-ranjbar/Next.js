"use client"

import { createAddress } from "@/actions/profile"
import Button from "@/components/Button"
import { useActionState, useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function CreateForm({ provinces, cities }) {

    const [filteredCities, setFilteredCitites] = useState(cities.filter(city => city.province_id == provinces[0].id))
    
    const [stateCreate, formActionCreate, isPending] = useActionState(createAddress, {})

    function handleCity(e) {
        setFilteredCitites(cities.filter(city => city.province_id == e.target.value))
    }


    useEffect(() => {
        toast(stateCreate?.message, { type: `${stateCreate?.status}` })
    }, [stateCreate])

    return (
        <>
            <button className="btn btn-primary" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseExample">
                ایجاد آدرس جدید
            </button>

            <form action={formActionCreate} className="collapse mt-3" id="collapseExample">
                <div className="card card-body">
                    <div className="row g-4">
                        <div className="col col-md-6">
                            <label className="form-label">عنوان</label>
                            <input name="title" type="text" className="form-control" />
                        </div>
                        <div className="col col-md-6">
                            <label className="form-label">شماره تماس</label>
                            <input name="contactPhone" type="text" className="form-control" />
                        </div>
                        <div className="col col-md-6">
                            <label className="form-label">کد پستی</label>
                            <input name="zipCode" type="text" className="form-control" />
                        </div>
                        <div className="col col-md-6">
                            <label className="form-label">استان</label>
                            <select name="province" className="form-select" onChange={handleCity}>
                                {provinces.map(province => (
                                    <option key={province.id} value={province.id}>{province.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col col-md-6">
                            <label className="form-label">شهر</label>
                            <select name="city" className="form-select">
                                {filteredCities.map(city => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col col-md-12">
                            <label className="form-label">آدرس</label>
                            <textarea name="locationAddress" type="text" rows="5" className="form-control"></textarea>
                        </div>
                    </div>
                    <div>
                        <Button title="ایجاد" style="btn btn-primary mt-4" isPending={isPending} />
                    </div>
                </div>
            </form>
        </>
    )
}
