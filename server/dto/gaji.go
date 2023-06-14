package dto

type GajiDto struct {
	GajiId       uint   `json:"gaji_id"`
	KaryawanId   uint   `json:"karyawan_id" form:"karyawan_id" validate:"required"`
	GajiPokok    int64  `json:"gaji_pokok" form:"gaji_pokok" validate:"required"`
	Bonus        int64  `json:"bonus"`
	Pph          int64  `json:"pph"`
	GajiDiterima int64  `json:"gaji_diterima"`
	TglGaji      string `json:"tgl_gaji"`
}
