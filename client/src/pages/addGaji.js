import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useParams } from 'react-router-dom'
import Form from "react-bootstrap/Form"
import Header from "../components/header";
import Button from "react-bootstrap/esm/Button";
import Swal from "sweetalert2";
import Footers from "../components/footer";

const AddGaji = () => {
    let navigate = useNavigate()
    const { id } = useParams()
    const [gaji, setGaji] = useState('')
    const [tanggal, setTgl] = useState('')

    var convert_id = parseInt(id)
    var convert_gaji = parseInt(gaji)
    const submitHandler = (e) => {
        e.preventDefault()

        fetch('http://localhost:8000/v1/gaji/', {
            method: 'POST',
            withCredentials: false,
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({
                karyawan_id: convert_id,
                gaji_pokok: convert_gaji,
                tgl_gaji: tanggal
            }),
        }).then(resp => {
            if (resp.status === 200) {
                Swal.fire({
                    title: 'Success',
                    type: 'success',
                    icon: 'success',
                    text: "Data Berhasil Di Tambahkan",
                }).then(function () {
                    window.location.href="/karyawan/"+ id + "/gaji"
                })
            } else {
                Swal.fire({
                    title: 'Error',
                    type: 'error',
                    icon: 'error',
                    text: "Data Gagal Di Tambahkan",
                }).then(function () {
                })
            }
        })
    }
    return (
        <>
            <main style={{ height: "100%", backgroundColor: "#f7f7f7" }}>
                <Header />
                <div className="w-100 h-100 p-4 bg-white justify-content-md-center">
                    <div className="col-md-50">
                        <Form onSubmit={submitHandler} className="col-md-5 m-auto">
                            <Form.Group className="mb-3">
                                <Form.Label>Gaji Pokok</Form.Label>
                                <Form.Control onChange={(e) => setGaji(e.target.value)} type="number" placeholder="Gaji Pokok ..." required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Tanggal Terima Gaji</Form.Label>
                                <Form.Control onChange={(e) => setTgl(e.target.value)} type="date" placeholder="Tanggal ..." required />
                            </Form.Group>
                            <Button type="submit" className="mt-5 col-md-12 btn btn-success">Save</Button>
                        </Form>
                    </div>
                </div>
                <Footers />
            </main>
        </>
    )
}

export default AddGaji