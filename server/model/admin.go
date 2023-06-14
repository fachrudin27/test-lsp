package model

import (
	"time"

	"gorm.io/gorm"
)

type Admin struct {
	AdminID   uint           `gorm:"primaryKey;autoIncrement" json:"admin_id"`
	Username  string         `gorm:"size:50;not null" json:"username"`
	Password  string         `gorm:"size:50;not null" json:"password"`
	CreatedAT time.Time      `json:"created_at"`
	UpdatedAT time.Time      `json:"updated_at"`
	DeletedAT gorm.DeletedAt `gorm:"index"`
}
