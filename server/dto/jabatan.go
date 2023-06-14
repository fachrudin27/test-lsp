package dto

type JabatanDto struct {
	NamaJabatan string  `json:"nama_jabatan" form:"nama_jabatan" validate:"required"`
	Bonus       float32 `json:"bonus" validate:"required"`
}

type JabatanUpdate struct {
	JabatanId   uint    `json:"jabatan_id"`
	NamaJabatan string  `json:"nama_jabatan" form:"nama_jabatan" validate:"required"`
	Bonus       float32 `json:"bonus" validate:"required"`
}
