package service

import (
	"github.com/fachrudin27/test-lsp/dto"
	"github.com/fachrudin27/test-lsp/model"
)

func (s *ServiceS) GetAllKaryawan() ([]model.Karyawan, error) {
	return s.Repo.GetAllKaryawan()
}

func (s *ServiceS) CreateKaryawan(payloads dto.KaryawanDto) (dto.KaryawanDto, error) {
	return s.Repo.CreateKaryawan(payloads)
}

func (s *ServiceS) UpdateKaryawan(payloads dto.KaryawanDto) (dto.KaryawanDto, error) {
	return s.Repo.UpdateKaryawan(payloads)
}

func (s *ServiceS) GetKaryawanById(payloads dto.KaryawanDto) (model.Karyawan, error) {
	return s.Repo.GetKaryawanById(payloads)
}

func (s *ServiceS) DeleteKaryawan(payloads dto.KaryawanDto) error {
	return s.Repo.DeleteKaryawan(payloads)
}
