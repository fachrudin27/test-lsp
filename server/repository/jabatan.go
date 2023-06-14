package repository

import (
	"time"

	"github.com/fachrudin27/test-lsp/dto"
	"github.com/fachrudin27/test-lsp/model"
)

func (u *RepositoryS) CreateJabatan(payloads dto.JabatanDto) (dto.JabatanDto, error) {
	jabatan := model.Jabatan{
		NamaJabatan: payloads.NamaJabatan,
		Bonus:       payloads.Bonus,
		CreatedAT:   time.Now(),
		UpdatedAT:   time.Now(),
	}

	err := u.db.Create(&jabatan).Error
	if err != nil {
		return payloads, err
	}

	return payloads, nil
}

func (u *RepositoryS) GetAllJabatan() ([]model.Jabatan, error) {

	jabatan := []model.Jabatan{}

	if err := u.db.Model(&model.Jabatan{}).Find(&jabatan).Error; err != nil {
		return nil, err
	}

	return jabatan, nil
}

func (u *RepositoryS) UpdateJabatan(payloads dto.JabatanUpdate) (dto.JabatanUpdate, error) {
	if err := u.db.Model(&model.Jabatan{}).Where("jabatan_id = ?", payloads.JabatanId).Updates(&model.Jabatan{
		NamaJabatan: payloads.NamaJabatan,
		Bonus:       payloads.Bonus,
		UpdatedAT:   time.Now(),
	}).Error; err != nil {
		return payloads, err
	}

	return payloads, nil
}

func (u *RepositoryS) GetJabatanById(payloads dto.JabatanUpdate) (model.Jabatan, error) {
	jabatan := model.Jabatan{}
	if err := u.db.Model(&model.Jabatan{}).Where("jabatan_id = ?", payloads.JabatanId).Find(&jabatan).Error; err != nil {
		return jabatan, err
	}

	return jabatan, nil
}
