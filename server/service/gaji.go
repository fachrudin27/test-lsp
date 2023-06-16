package service

import (
	"fmt"

	"github.com/fachrudin27/test-lsp/model"

	"github.com/fachrudin27/test-lsp/dto"
)

func (s *ServiceS) CreateGaji(payloads dto.GajiDto) (dto.GajiDto, error) {

	// GET Bonus from table bonus
	karyawanID := dto.KaryawanDto{
		KaryawanID: payloads.KaryawanId,
	}
	bonus_jabatan, err := s.Repo.GetKaryawanById(karyawanID)
	if err != nil {
		fmt.Println(err)
		return payloads, err
	}

	count_bonus := float32(payloads.GajiPokok) * bonus_jabatan.Jabatan.Bonus

	// Convert and Save BONUS
	bonus := int64(count_bonus)

	// PPH 5%
	count_pph := float32((payloads.GajiPokok + bonus)) * 0.05

	// Convert and Save PPH
	pph := int64(count_pph)

	// FIX SALARY
	salary := (payloads.GajiPokok + bonus) - pph

	temp := dto.GajiDto{
		KaryawanId:   payloads.KaryawanId,
		GajiPokok:    payloads.GajiPokok,
		Bonus:        bonus,
		Pph:          pph,
		GajiDiterima: salary,
		TglGaji:      payloads.TglGaji,
	}
	return s.Repo.CreateGaji(temp)
}

func (s *ServiceS) GetGajiById(payloads dto.GajiDto) (model.Gaji, error) {
	return s.Repo.GetGajiById(payloads)
}

func (s *ServiceS) GetGajiByIdKaryawan(payloads dto.GajiDto) ([]model.Gaji, error) {
	return s.Repo.GetGajiByIdKaryawan(payloads)
}

func (s *ServiceS) UpdateGaji(payloads dto.GajiDto) (dto.GajiDto, error) {

	karyawanID := dto.KaryawanDto{
		KaryawanID: payloads.KaryawanId,
	}

	bonus_jabatan, err := s.Repo.GetKaryawanById(karyawanID)
	if err != nil {
		return payloads, err
	}

	count_bonus := float32(payloads.GajiPokok) * bonus_jabatan.Jabatan.Bonus

	// Convert and Save BONUS
	bonus := int64(count_bonus)

	// PPH 5%
	count_pph := float32((payloads.GajiPokok + bonus)) * 0.05

	// Convert and Save PPH
	pph := int64(count_pph)

	// FIX SALARY
	salary := (payloads.GajiPokok + bonus) - pph

	temp := dto.GajiDto{
		GajiId:       payloads.GajiId,
		KaryawanId:   payloads.KaryawanId,
		GajiPokok:    payloads.GajiPokok,
		Bonus:        bonus,
		Pph:          pph,
		GajiDiterima: salary,
		TglGaji:      payloads.TglGaji,
	}

	return s.Repo.UpdateGaji(temp)
}

func (s *ServiceS) DeleteGaji(payloads dto.GajiDto) error {
	return s.Repo.DeleteGaji(payloads)
}
