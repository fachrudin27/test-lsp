package repository

import (
	"github.com/fachrudin27/test-lsp/dto"
	"github.com/fachrudin27/test-lsp/model"
)

func (u *RepositoryS) CreateReport(payloads dto.LaporanDto) ([]dto.LaporanDto, error) {
	report := []dto.LaporanDto{}

	if err := u.db.Model(&model.Gaji{}).Select("karyawans.nama as nama_karyawan, jabatans.nama_jabatan as Jabatan, sum(gajis.gaji_pokok) as gaji_pokok, sum(gajis.bonus) as gaji_bonus, sum(gajis.pph) as pph, sum(gajis.gaji_diterima) as gaji_terima").
		Joins("JOIN karyawans ON karyawans.karyawan_id = gajis.karyawan_id").
		Joins("JOIN jabatans ON jabatans.jabatan_id = karyawans.jabatan_id").
		Where("gajis.tgl_gaji BETWEEN ? AND ?", payloads.StartDate, payloads.EndDate).
		Where("karyawans.deleted_at IS NULL").
		Group("gajis.karyawan_id").
		Scan(&report).
		Error; err != nil {

		return report, err
	}

	return report, nil
}
