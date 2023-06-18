import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Header from "../components/header";
import Button from "react-bootstrap/esm/Button";
import Swal from "sweetalert2"
import Footers from "../components/footer";

const AddKaryawan = () => {
    let navigate = useNavigate()

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
        GetJabatan()
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()

        fetch('http://localhost:8000/v1/karyawan/', {
            method: 'POST',
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
                Swal.fire({
                    title: 'Success',
                    type: 'success',
                    icon: 'success',
                    text: "Data Berhasil Di Tambahkan",
                }).then(function () {
                    window.location.href="/"
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
                                <Form.Label>Nama Lengkap</Form.Label>
                                <Form.Control onChange={(e) => setNama(e.target.value)} type="text" placeholder="Nama Lengkap ..." required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Alamat</Form.Label>
                                <Form.Control onChange={(e) => setAlamat(e.target.value)} as="textarea" placeholder="Alamat ..." rows={3} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>No Telephone</Form.Label>
                                <Form.Control onChange={(e) => setTelphone(e.target.value)} type="number" placeholder="No Telephone ..." />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Jabatan</Form.Label>
                                <Form.Control onChange={(e) => setJabatan(e.target.value)} as="select">
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

export default AddKaryawan