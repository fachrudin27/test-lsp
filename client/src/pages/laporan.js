import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Footers from "../components/footer";
import Header from "../components/header";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form"
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFViewer, Document, Page, Text, View, StyleSheet, TableHeader, TableCell, TableBody } from "@react-pdf/renderer"
import PDF from "./PDF";

const Laporan = () => {

    let navigate = useNavigate()

    const [data, setData] = useState([])
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [total_all, setTotal] = useState('')
    var no = 1

    var total_gaji = 0
    const submitHandler = async (e) => {
        e.preventDefault()

        const response = await fetch('http://localhost:8000/v1/laporan/', {
            method: 'POST',
            withCredentials: false,
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({
                start_date: start,
                end_date: end,
            }),
        })

        const data_json = await response.json()
        setData(data_json.data)
    }
    useEffect(() => {
        total_gaji = data.reduce(
            (total, item) => total + item.gaji_terima, 0
        )
        setTotal(total_gaji)
    }, [data])
    return (
        <main style={{ height: "100%", backgroundColor: "#f7f7f7" }}>
            <Header />
            <div className="w-100 h-100 p-4 bg-white justify-content-md-center">
                <div className="col-md-12 m-auto">
                    <div className="m-auto">
                        <Form onSubmit={submitHandler} className="col-md-12">
                            <div className="row">
                                <div className="col-md-3">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Dari Tanggal</Form.Label>
                                        <Form.Control onChange={(e) => setStart(e.target.value)} type="date" required />
                                    </Form.Group>
                                </div>
                                <div className="col-md-3">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Sampai Tanggal</Form.Label>
                                        <Form.Control onChange={(e) => setEnd(e.target.value)} type="date" required />
                                    </Form.Group>
                                </div>
                                <div className="col-md-3 mt-2">
                                    <Form.Group className="mt-4">
                                        <Button type="submit">Cari Data</Button>
                                    </Form.Group>
                                </div>
                                <div className="col-md-3 mt-2">
                                    {data.length > 0 && (
                                        <Form.Group className="mt-4">
                                            <PDFDownloadLink document={<PDF temp={data} mulai={start} selesai={end} total={total_all}/>} fileName="report">
                                                Unduh Laporan
                                            </PDFDownloadLink>
                                        </Form.Group>
                                    )}
                                </div>
                            </div>
                        </Form>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nama Karyawan</th>
                                <th>Jabatan</th>
                                <th>Gaji Pokok</th>
                                <th>Bonus</th>
                                <th>PPH</th>
                                <th>Gaji Bersih</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item, index) => (
                                <tr>
                                    <td>{no++}</td>
                                    <td>{item.nama_karyawan}</td>
                                    <td>{item.jabatan}</td>
                                    <td>{new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                    }).format(item.gaji_pokok)}</td>
                                    <td>{new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                    }).format(item.gaji_bonus)}</td>
                                    <td>{new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                    }).format(item.pph)}</td>
                                    <td>{new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                    }).format(item.gaji_terima)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
            <Footers />
        </main>
    )
}

export default Laporan