import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import Footers from "../components/footer";
import Header from "../components/header";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
const Gaji = () => {
    let navigate = useNavigate()

    const { id } = useParams()
    const [dataGaji, setDataGaji] = useState([])
    var no = 1

    useEffect(() => {
        const GetGaji = async () => {
            const response = await fetch('http://localhost:8000/v1/gaji/karyawan/' + id, {
                method: "GET",
                headers: { 'content-Type': 'application/json' },
            })
            const data_json = await response.json()
            if (dataGaji == null) {
                return
            } else {
                setDataGaji(data_json.data)
            }
        }
        GetGaji()
    }, [])

    const handlerDelete = (idGaji) => {
        Swal.fire({
            title: 'Apakah Anda Yakin?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('http://localhost:8000/v1/gaji/' + idGaji, {
                    method: 'DELETE',
                }).then(resp => {
                    if (resp.status === 200) {
                        Swal.fire(
                            'Deleted!',
                            'Data Berhasil Dihapus',
                            'success'
                        ).then(function () {
                            navigate(0)
                        })
                    }else{
                        Swal.fire(
                            'Deleted!',
                            'Data Gagal Dihapus',
                            'error'
                        )
                    }
                })
            }
        })
    }
    return (
        <main style={{ height: "100%", backgroundColor: "#f7f7f7" }}>
            <Header />
            <div className="w-100 h-100 p-4 bg-white justify-content-md-center">
                <div className="col-md-12 m-auto">
                    <Button className="btn btn-warning m-3 float-right" href={"/karyawan/"+ id +"/gaji/add"}>Tambah Gaji</Button>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Gaji Pokok</th>
                                <th>Bonus</th>
                                <th>PPH</th>
                                <th>Gaji Diterima</th>
                                <th>Tanggal Gaji</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataGaji?.map((item) => (
                                <tr key={item.gaji_id}>
                                    <td>{no++}</td>
                                    <td>{new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                    }).format(item.gaji_pokok)}</td>
                                    <td>{new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                    }).format(item.bonus)}</td>
                                    <td>{new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                    }).format(item.pph)}</td>
                                    <td>{new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                    }).format(item.gaji_diterima)}</td>
                                    <td>{Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(new Date(item.tgl_gaji))}</td>
                                    <td>
                                        <Button className="mr-2" href={"/karyawan/"+ item.karyawan_id +"/gaji/edit/" + item.gaji_id}>Edit</Button>
                                        <Button onClick={() => handlerDelete(item.gaji_id)} className="mr-2 btn btn-danger">Delete</Button>
                                    </td>
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

export default Gaji