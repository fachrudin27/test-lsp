package dto

type KaryawanDto struct {
	KaryawanID uint   `json:"karyawan_id"`
	Nama       string `json:"nama" form:"nama_jabatan" validate:"required"`
	Alamat     string `json:"alamat" form:"nama_jabatan" validate:"required"`
	NoTelp     string `json:"no_telp"`
	JabatanId  uint   `json:"jabatan_id" form:"nama_jabatan" validate:"required"`
}
