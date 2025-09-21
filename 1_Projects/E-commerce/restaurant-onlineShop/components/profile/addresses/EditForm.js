"use client"

import { editAddress } from "@/actions/profile"
import Button from "@/components/Button"
import { useActionState, useEffect, useState } from "react"
import { toast } from "react-toastify"
import DeleteForm from "./DeleteForm"

export default function EditForm({ address, provinces, cities }) {

    const [filteredCities, setFilteredCitites] = useState(cities)
    const [stateEdit, formActionEdit, isPending] = useActionState(editAddress, {})

    function handleCity(e) {
        setFilteredCitites(cities.filter(city => city.province_id == e.target.value))
    }


    useEffect(() => {
        toast(stateEdit?.message, { type: `${stateEdit?.status}` })
    }, [stateEdit])

    return (
        <>
            <div className="position-relative">
                <form action={formActionEdit} className="card card-body mt-3">
                    <div className="row g-4">
                        <div className="col col-md-6">
                            <label className="form-label">عنوان</label>
                            <input name="title" defaultValue={address.title} type="text" className="form-control" />
                        </div>
                        <div className="col col-md-6">
                            <label className="form-label">شماره تماس</label>
                            <input name="contactPhone" defaultValue={address.cellphone} type="text" className="form-control" />
                        </div>
                        <div className="col col-md-6">
                            <label className="form-label">کد پستی</label>
                            <input name="zipCode" defaultValue={address.postal_code} type="text" className="form-control" />
                        </div>
                        <div className="col col-md-6">
                            <label className="form-label">استان</label>
                            <select name="province" defaultValue={address.province_id} className="form-select" onChange={handleCity}>
                                {provinces.map(province => (
                                    <option key={province.id} value={province.id}>{province.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col col-md-6">
                            <label className="form-label">شهر</label>
                            <select name="city" defaultValue={address.city_id} className="form-select">
                                {filteredCities.map(city => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col col-md-12">
                            <label className="form-label">آدرس</label>
                            <textarea name="locationAddress" defaultValue={address.address} type="text" rows="5" className="form-control"></textarea>
                        </div>
                        <input type="hidden" name="address_id" value={address.id} />
                    </div>
                    <div>
                        <Button title="ویرایش" style="btn btn-primary mt-4" isPending={isPending} />
                    </div>
                </form>
                <DeleteForm address={address} />
            </div>
        </>
    )
}
