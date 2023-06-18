import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useParams } from 'react-router-dom'
import Form from "react-bootstrap/Form"
import Header from "../components/header";
import Button from "react-bootstrap/esm/Button";
import Swal from "sweetalert2";
import Footers from "../components/footer";

const EditKaryawan = () => {
    let navigate = useNavigate()

    const { id } = useParams()
    const [data, setData] = useState([])

    const [nama, setNama] = useState('')
    const [alamat, setAlamat] = useState('')
    const [telphone, setTelphone] = useState('')
    const [jabatan, setJabatan] = useState('')

    var jabatan_conv = parseInt(jabatan)
    useEffect(() => {
        const GetJabatan = async () => {
            const response = await fetch('http://localhost:8000/v1/jabatan/', {
                method: "GET",
                headers: { 'content-Type': 'application/json' },
            })
            const data_json = await response.json()
            if (data == null) {
                return

            } else {

                return setData(data_json.data)
            }
        }
        const GetKandidatById = async () => {
            const response = await fetch('http://localhost:8000/v1/karyawan/' + id, {
                method: "GET",
                headers: { 'content-Type': 'application/json' },
            })
            const data = await response.json()
            setNama(data.data.nama)
            setAlamat(data.data.alamat)
            setTelphone(data.data.no_telp)
            setJabatan(data.data.jabatan_id)
        }
        GetKandidatById()
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
                fetch('http://localhost:8000/v1/karyawan/' + id, {
                    method: 'PUT',
                    withCredentials: false,
                    headers: { 'content-Type': 'application/json' },
                    body: JSON.stringify({
                        nama: nama,
                        alamat: alamat,
                        no_telp: telphone,
                        jabatan_id: jabatan_conv,
                    }),
                }).then(resp => {
                    if (resp.status === 200) {
                        Swal.fire('Data Berhasil Diperbarui!', '', 'success').then(function () {
                            window.location.href = "/"
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
                                <Form.Label>Nama Lengkap</Form.Label>
                                <Form.Control value={nama} onChange={(e) => setNama(e.target.value)} type="text" placeholder="Nama Lengkap ..." required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Alamat</Form.Label>
                                <Form.Control value={alamat} onChange={(e) => setAlamat(e.target.value)} as="textarea" placeholder="Alamat ..." rows={3} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>No Telephone</Form.Label>
                                <Form.Control value={telphone} onChange={(e) => setTelphone(e.target.value)} type="number" placeholder="No Telephone ..." />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Jabatan</Form.Label>
                                <Form.Control value={jabatan} onChange={(e) => setJabatan(e.target.value)} as="select">
                                    <option>Pilih Jabatan</option>
                                    {data?.map((item) => (
                                        <>
                                            <option value={item.jabatan_id}>{item.nama_jabatan}</option>
                                        </>
                                    ))}
                                </Form.Control>
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

export default EditKaryawan