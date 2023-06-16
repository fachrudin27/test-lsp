package service

import (
	"github.com/fachrudin27/test-lsp/dto"
	"github.com/fachrudin27/test-lsp/model"
	"github.com/fachrudin27/test-lsp/repository"
)

type Service interface {
	GetAllKaryawan() ([]model.Karyawan, error)
	CreateKaryawan(payloads dto.KaryawanDto) (dto.KaryawanDto, error)
	UpdateKaryawan(payloads dto.KaryawanDto) (dto.KaryawanDto, error)
	GetKaryawanById(payloads dto.KaryawanDto) (model.Karyawan, error)
	DeleteKaryawan(payloads dto.KaryawanDto) error

	CreateJabatan(payloads dto.JabatanDto) (dto.JabatanDto, error)
	GetAllJabatan() ([]model.Jabatan, error)
	UpdateJabatan(payloads dto.JabatanUpdate) (dto.JabatanUpdate, error)
	GetJabatanById(payloads dto.JabatanUpdate) (model.Jabatan, error)

	CreateGaji(payloads dto.GajiDto) (dto.GajiDto, error)
	GetGajiById(payloads dto.GajiDto) (model.Gaji, error)
	UpdateGaji(payloads dto.GajiDto) (dto.GajiDto, error)
	DeleteGaji(payloads dto.GajiDto) error
	GetGajiByIdKaryawan(payloads dto.GajiDto) ([]model.Gaji, error)
}

type ServiceS struct {
	Repo repository.Repository
}

func NewService(Repos repository.Repository) *ServiceS {
	return &ServiceS{
		Repo: Repos,
	}
}
