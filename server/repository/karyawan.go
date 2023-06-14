package repository

import (
	"time"

	"github.com/fachrudin27/test-lsp/dto"
	"github.com/fachrudin27/test-lsp/model"
)

func (u *RepositoryS) GetAllKaryawan() ([]model.Karyawan, error) {

	karyawan := []model.Karyawan{}

	if err := u.db.Model(&model.Karyawan{}).Preload("Jabatan").Find(&karyawan).Error; err != nil {
		return nil, err
	}

	return karyawan, nil
}

func (u *RepositoryS) CreateKaryawan(payloads dto.KaryawanDto) (dto.KaryawanDto, error) {
	karyawan := model.Karyawan{
		Nama:      payloads.Nama,
		Alamat:    payloads.Alamat,
		NoTelp:    payloads.NoTelp,
		JabatanId: payloads.JabatanId,
		CreatedAT: time.Now(),
		UpdatedAT: time.Now(),
	}

	err := u.db.Create(&karyawan).Error
	if err != nil {
		return payloads, err
	}

	return payloads, nil
}

func (u *RepositoryS) UpdateKaryawan(payloads dto.KaryawanDto) (dto.KaryawanDto, error) {
	if err := u.db.Model(&model.Karyawan{}).Where("karyawan_id = ?", payloads.KaryawanID).Updates(&model.Karyawan{
		Nama:      payloads.Nama,
		Alamat:    payloads.Alamat,
		NoTelp:    payloads.NoTelp,
		JabatanId: payloads.JabatanId,
		UpdatedAT: time.Now(),
	}).Error; err != nil {
		return payloads, err
	}

	return payloads, nil
}

func (u *RepositoryS) GetKaryawanById(payloads dto.KaryawanDto) (model.Karyawan, error) {
	karyawan := model.Karyawan{}
	if err := u.db.Model(&model.Karyawan{}).Where("karyawan_id = ?", payloads.KaryawanID).Preload("Jabatan").Find(&karyawan).Error; err != nil {
		return karyawan, err
	}

	return karyawan, nil
}

func (u *RepositoryS) DeleteKaryawan(payloads dto.KaryawanDto) error {
	if err := u.db.Model(&model.Karyawan{}).Where("karyawan_id = ?", payloads.KaryawanID).Delete(&model.Karyawan{}).Error; err != nil {
		return err
	}

	return nil
}
