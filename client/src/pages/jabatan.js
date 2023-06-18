import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Footers from "../components/footer";
import Swal from "sweetalert2";

const Jabatan = () => {
    let navigate = useNavigate()
    const [data, setData] = useState([])

    var no = 1
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

    const handlerDelete = (id) => {
        Swal.fire({
            title: 'Apakah Anda Yakin?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('http://localhost:8000/v1/jabatan/' + id, {
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
                    <Button className="btn btn-warning m-3 float-right" href="/jabatan/add">Tambah Jabatan</Button>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nama Jabatan</th>
                                <th>Bonus</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item) => (
                                <tr key={item.jabatan_id}>
                                    <td>{no++}</td>
                                    <td>{item.nama_jabatan}</td>
                                    <td>{item.bonus}</td>
                                    <td>
                                        <Button className="mr-2" href={"/jabatan/edit/" + item.jabatan_id}>Edit</Button>
                                        <Button onClick={() => handlerDelete(item.jabatan_id)} className="mr-2 btn btn-danger">Delete</Button>
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

export default Jabatan