import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useParams } from 'react-router-dom'
import Form from "react-bootstrap/Form"
import Header from "../components/header";
import Button from "react-bootstrap/esm/Button";
import Swal from "sweetalert2";
import Footers from "../components/footer";

const EditGaji = () => {
    let navigate = useNavigate()

    const { gajiId } = useParams()
    const { id } = useParams()
    const [gaji, setGaji] = useState('')
    const [tanggal, setTgl] = useState('')

    // var convert_gajiId = parseInt(gajiId)
    var convert_id = parseInt(id)
    var convert_gaji = parseInt(gaji)

    useEffect(() => {
        const GetGajiById = async () => {
            const response = await fetch('http://localhost:8000/v1/gaji/' + gajiId, {
                method: "GET",
                headers: { 'content-Type': 'application/json' },
            })
            const data = await response.json()
            setGaji(data.data.gaji_pokok)
            setTgl(data.data.tgl_gaji)
        }
        GetGajiById()
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
                fetch('http://localhost:8000/v1/gaji/' + gajiId, {
                    method: 'PUT',
                    withCredentials: false,
                    headers: { 'content-Type': 'application/json' },
                    body: JSON.stringify({
                        karyawan_id: convert_id,
                        gaji_pokok: convert_gaji,
                        tgl_gaji: tanggal
                    }),
                }).then(resp => {
                    if (resp.status === 200) {
                        Swal.fire('Data Berhasil Diperbarui!', '', 'success').then(function () {
                            window.location.href = "/karyawan/"+ id +"/gaji/"
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
                                <Form.Label>Gaji Pokok</Form.Label>
                                <Form.Control value={gaji} onChange={(e) => setGaji(e.target.value)} type="number" placeholder="Gaji Pokok ..." required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Tanggal Terima Gaji</Form.Label>
                                <Form.Control value={tanggal} onChange={(e) => setTgl(e.target.value)} type="date" placeholder="Tanggal ..." required />
                                <Form.Text className="text-muted">
                                    Tanggal Terima Gaji Harus dimasukkan Kembali !
                                </Form.Text>
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

export default EditGaji