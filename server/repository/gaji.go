package repository

import (
	"time"

	"github.com/fachrudin27/test-lsp/dto"
	"github.com/fachrudin27/test-lsp/model"
)

func (u *RepositoryS) CreateGaji(payloads dto.GajiDto) (dto.GajiDto, error) {
	convert := payloads.TglGaji

	date, err := time.Parse("2006-01-02", convert)
	if err != nil {
		return payloads, err
	}

	gaji := model.Gaji{
		KaryawanId:   payloads.KaryawanId,
		GajiPokok:    payloads.GajiPokok,
		Bonus:        payloads.Bonus,
		Pph:          payloads.Pph,
		GajiDiterima: payloads.GajiDiterima,
		TglGaji:      date,
		CreatedAT:    time.Now(),
		UpdatedAT:    time.Now(),
	}

	err = u.db.Create(&gaji).Error
	if err != nil {
		return payloads, err
	}

	return payloads, nil
}

func (u *RepositoryS) GetGajiById(payloads dto.GajiDto) (model.Gaji, error) {
	gaji := model.Gaji{}
	if err := u.db.Model(&model.Gaji{}).Where("gaji_id = ?", payloads.GajiId).Preload("Karyawan").Find(&gaji).Error; err != nil {
		return gaji, err
	}

	return gaji, nil
}

func (u *RepositoryS) GetGajiByIdKaryawan(payloads dto.GajiDto) ([]model.Gaji, error) {
	gaji := []model.Gaji{}
	if err := u.db.Model(&model.Gaji{}).Where("karyawan_id = ?", payloads.KaryawanId).Preload("Karyawan").Find(&gaji).Error; err != nil {
		return gaji, err
	}

	return gaji, nil
}

func (u *RepositoryS) UpdateGaji(payloads dto.GajiDto) (dto.GajiDto, error) {
	convert := payloads.TglGaji

	date, err := time.Parse("2006-01-02", convert)
	if err != nil {
		return payloads, err
	}

	if err := u.db.Model(&model.Gaji{}).Where("gaji_id = ?", payloads.GajiId).Updates(&model.Gaji{
		KaryawanId:   payloads.KaryawanId,
		GajiPokok:    payloads.GajiPokok,
		Bonus:        payloads.Bonus,
		Pph:          payloads.Pph,
		GajiDiterima: payloads.GajiDiterima,
		TglGaji:      date,
		UpdatedAT:    time.Now(),
	}).Error; err != nil {
		return payloads, err
	}

	return payloads, nil
}

func (u *RepositoryS) DeleteGaji(payloads dto.GajiDto) error {
	if err := u.db.Model(&model.Gaji{}).Where("gaji_id = ?", payloads.GajiId).Delete(&model.Gaji{}).Error; err != nil {
		return err
	}

	return nil
}
