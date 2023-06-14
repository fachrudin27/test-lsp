package model

import (
	"time"

	"gorm.io/gorm"
)

type Karyawan struct {
	KaryawanID uint           `gorm:"primaryKey;autoIncrement" json:"karyawan_id"`
	Nama       string         `gorm:"size:50;not null" json:"nama"`
	Alamat     string         `gorm:"size:200;not null" json:"alamat"`
	NoTelp     string         `gorm:"size:12;not null" json:"no_telp"`
	Jabatan    Jabatan        `gorm:"foreignKey:JabatanId"`
	JabatanId  uint           `json:"jabatan_id"`
	CreatedAT  time.Time      `json:"created_at"`
	UpdatedAT  time.Time      `json:"updated_at"`
	DeletedAT  gorm.DeletedAt `gorm:"index"`
}
