package service

import "github.com/fachrudin27/test-lsp/dto"

func (s *ServiceS) CreateReport(payloads dto.LaporanDto) ([]dto.LaporanDto, error) {
	return s.Repo.CreateReport(payloads)
}
