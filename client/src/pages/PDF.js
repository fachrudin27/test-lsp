import React from "react";
import { PDFViewer, Document, Page, Text, View, StyleSheet, Table, TableHeader, TableCell, TableBody } from "@react-pdf/renderer"

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    section: {
        flexGrow: 1
    },
    heading: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    secondHeading: {
        fontSize: 12,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        paddingBottom: 5,
        marginBottom: 5
    },
    tableHeaderCell: {
        flex: 1,
        fontWeight: 'bold',
        borderRightWidth: 1,
        borderRightColor: '#000000',
        paddingRight: 5,
        textAlign: 'center',
        fontSize: 12,
    },
    tableRow: {
        flexDirection: 'row',
        marginBottom: 5
    },
    tableCell: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: '#000000',
        paddingRight: 5,
        textAlign: 'center',
        fontSize: 10,
    },
    totalContainer: {
        // position: "absolute",
        // bottom: 30,
        marginTop: 10,
        textAlign: 'right'
    },
    totalText: {
        fontSize: 12,
        fontWeight: "bold",
    },
})

const PDF = ({ temp, mulai, selesai, total }) => {
    var no = 1
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.heading}>Laporan Gaji PT. Baroqah tbk</Text>
                    <Text style={styles.secondHeading}>Tanggal {mulai} Sampai {selesai}</Text>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderCell}>#</Text>
                        <Text style={styles.tableHeaderCell}>Nama Karyawan</Text>
                        <Text style={styles.tableHeaderCell}>Jabatan</Text>
                        <Text style={styles.tableHeaderCell}>Gaji Pokok</Text>
                        <Text style={styles.tableHeaderCell}>Bonus</Text>
                        <Text style={styles.tableHeaderCell}>PPH</Text>
                        <Text style={styles.tableHeaderCell}>Gaji Bersih</Text>
                    </View>
                    {temp?.map((item) => (
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>{no++}</Text>
                            <Text style={styles.tableCell}>{item.nama_karyawan}</Text>
                            <Text style={styles.tableCell}>{item.jabatan}</Text>
                            <Text style={styles.tableCell}>{new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                            }).format(item.gaji_pokok)}</Text>
                            <Text style={styles.tableCell}>{new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                            }).format(item.gaji_bonus)}</Text>
                            <Text style={styles.tableCell}>{new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                            }).format(item.pph)}</Text>
                            <Text style={styles.tableCell}>{new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                            }).format(item.gaji_terima)}</Text>
                        </View>
                    ))}
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>
                            Total Gaji Bersih:{" "}
                            {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(total)}
                        </Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default PDF