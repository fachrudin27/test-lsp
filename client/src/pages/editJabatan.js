import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useParams } from 'react-router-dom'
import Form from "react-bootstrap/Form"
import Header from "../components/header";
import Button from "react-bootstrap/esm/Button";
import Swal from "sweetalert2";
import Footers from "../components/footer";

const EditJabatan = () => {

    let navigate = useNavigate()
    const { id } = useParams()
    const [data, setData] = useState([])

    const [jabatan, setJabatan] = useState('')
    const [bonus, setBonus] = useState('')

    var convert_bonus = parseFloat(bonus)
    useEffect(() => {
        const GetJabatan = async () => {
            const response = await fetch('http://localhost:8000/v1/jabatan/' + id, {
                method: "GET",
                headers: { 'content-Type': 'application/json' },
            })
            const data_json = await response.json()
            if (data == null) {
                return

            } else {

                setData(data_json.data)
                setJabatan(data_json.data.nama_jabatan)
                setBonus(data_json.data.bonus)
            }
        }
        GetJabatan()
    }, [])
    const submitHandler = (e) => {
        e.preventDefault()

        Swal.fire({
            title: 'Anda Ingin Menyimpan Perubahan Ini ?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('http://localhost:8000/v1/jabatan/' + id, {
                    method: 'PUT',
                    withCredentials: false,
                    headers: { 'content-Type': 'application/json' },
                    body: JSON.stringify({
                        nama_jabatan: jabatan,
                        bonus: convert_bonus,
                    }),
                }).then(resp => {
                    if (resp.status === 200) {
                        Swal.fire('Data Berhasil Diperbarui!', '', 'success').then(function () {
                            window.location.href = "/jabatan"
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
            } else if (result.isDenied) {
                Swal.fire('Perubahan Tidak Disimpan!', '', 'info')
                navigate(0)
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
                                <Form.Label>Jabatan</Form.Label>
                                <Form.Control value={jabatan} onChange={(e) => setJabatan(e.target.value)} type="text" placeholder="Nama Jabatan ..." required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Bonus</Form.Label>
                                <Form.Control value={bonus} onChange={(e) => setBonus(e.target.value)} type="text" placeholder="Bonus ..." required />
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

export default EditJabatan