package dto

type LaporanDto struct {
	StartDate    string `json:"start_date,omitempty"`
	EndDate      string `json:"end_date,omitempty"`
	NamaKaryawan string `json:"nama_karyawan"`
	Jabatan      string `json:"jabatan"`
	GajiPokok    int64  `json:"gaji_pokok"`
	GajiBonus    int64  `json:"gaji_bonus"`
	Pph          int64  `json:"pph"`
	GajiTerima   int64  `json:"gaji_terima"`
}
