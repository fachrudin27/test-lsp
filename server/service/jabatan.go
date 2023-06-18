package service

import (
	"github.com/fachrudin27/test-lsp/dto"
	"github.com/fachrudin27/test-lsp/model"
)

func (s *ServiceS) CreateJabatan(payloads dto.JabatanDto) (dto.JabatanDto, error) {
	return s.Repo.CreateJabatan(payloads)
}

func (s *ServiceS) GetAllJabatan() ([]model.Jabatan, error) {
	return s.Repo.GetAllJabatan()
}

func (s *ServiceS) UpdateJabatan(payloads dto.JabatanUpdate) (dto.JabatanUpdate, error) {
	return s.Repo.UpdateJabatan(payloads)
}

func (s *ServiceS) GetJabatanById(payloads dto.JabatanUpdate) (model.Jabatan, error) {
	return s.Repo.GetJabatanById(payloads)
}

func (s *ServiceS) DeleteJabatan(payloads dto.JabatanUpdate) error {
	return s.Repo.DeleteJabatan(payloads)
}
