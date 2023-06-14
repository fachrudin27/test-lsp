package model

import (
	"time"

	"gorm.io/gorm"
)

type Jabatan struct {
	JabatanID   uint           `gorm:"primaryKey;autoIncrement" json:"jabatan_id"`
	NamaJabatan string         `gorm:"size:50;not null" json:"nama_jabatan"`
	Bonus       float32        `gorm:"not null" json:"bonus"`
	CreatedAT   time.Time      `json:"created_at"`
	UpdatedAT   time.Time      `json:"updated_at"`
	DeletedAT   gorm.DeletedAt `gorm:"index"`
}
