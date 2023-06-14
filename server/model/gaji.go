package model

import (
	"time"

	"gorm.io/gorm"
)

type Gaji struct {
	GajiID       uint           `gorm:"primaryKey;autoIncrement" json:"gaji_id"`
	Karyawan     Karyawan       `gorm:"foreignKey:KaryawanId"`
	KaryawanId   uint           `json:"karyawan_id"`
	GajiPokok    int64          `gorm:"not null" json:"gaji_pokok"`
	Bonus        int64          `gorm:"not null" json:"bonus"`
	Pph          int64          `gorm:"not null" json:"pph"`
	GajiDiterima int64          `gorm:"not null" json:"gaji_diterima"`
	TglGaji      time.Time      `gorm:"type:time" json:"tgl_gaji"`
	CreatedAT    time.Time      `json:"created_at"`
	UpdatedAT    time.Time      `json:"updated_at"`
	DeletedAT    gorm.DeletedAt `gorm:"index"`
}
