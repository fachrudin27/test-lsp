import React,{ useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Header from "../components/header";
import Button from "react-bootstrap/esm/Button";
import Swal from "sweetalert2";
import Footers from "../components/footer";

const AddJabatan = () => {
    let navigate = useNavigate()

    const [jabatan, setJabatan] = useState('')
    const [bonus, setBonus] = useState('')

    var convert_bonus = parseFloat(bonus)
    const submitHandler = (e) => {
        e.preventDefault()

        fetch('http://localhost:8000/v1/jabatan/', {
            method: 'POST',
            withCredentials: false,
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({
                nama_jabatan: jabatan,
                bonus: convert_bonus
            }),
        }).then(resp => {
            if (resp.status === 200) {
                Swal.fire({
                    title: 'Success',
                    type: 'success',
                    icon: 'success',
                    text: "Data Berhasil Di Tambahkan",
                }).then(function () {
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
                                <Form.Control onChange={(e) => setJabatan(e.target.value)} type="text" placeholder="Nama Jabatan ..." required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Bonus</Form.Label>
                                <Form.Control onChange={(e) => setBonus(e.target.value)} type="text" placeholder="Bonus ..." required />
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

export default AddJabatan