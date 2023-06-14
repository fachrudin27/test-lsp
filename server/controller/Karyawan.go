package controller

import (
	"net/http"
	"strconv"

	"github.com/fachrudin27/test-lsp/dto"

	"github.com/fachrudin27/test-lsp/utils"
	"github.com/labstack/echo"
)

func (u *ControllerS) GetAllKaryawan(c echo.Context) error {

	resp, err := u.Serv.GetAllKaryawan()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.Response{
			Message: err.Error(),
			Code:    http.StatusInternalServerError,
		})
	}

	return c.JSON(http.StatusOK, utils.Response{
		Message: "success",
		Code:    http.StatusOK,
		Data:    resp,
	})
}

func (u *ControllerS) CreateKaryawan(c echo.Context) error {
	var payloads dto.KaryawanDto

	if err := c.Bind(&payloads); err != nil {
		return err
	}

	if err := c.Validate(payloads); err != nil {
		return c.JSON(http.StatusBadRequest, utils.Response{
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
	}

	resp, err := u.Serv.CreateKaryawan(payloads)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.Response{
			Message: err.Error(),
			Code:    http.StatusInternalServerError,
		})
	}

	return c.JSON(http.StatusOK, utils.Response{
		Message: "success",
		Code:    http.StatusOK,
		Data:    resp,
	})
}

func (u *ControllerS) UpdateKaryawan(c echo.Context) error {
	id := c.Param("id")
	convId, err := strconv.Atoi(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, utils.Response{
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
	}

	var payloads dto.KaryawanDto

	if err := c.Bind(&payloads); err != nil {
		return err
	}

	if err := c.Validate(payloads); err != nil {
		return c.JSON(http.StatusBadRequest, utils.Response{
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
	}

	temp := dto.KaryawanDto{
		KaryawanID: uint(convId),
		Nama:       payloads.Nama,
		Alamat:     payloads.Alamat,
		NoTelp:     payloads.NoTelp,
		JabatanId:  payloads.JabatanId,
	}

	resp, err := u.Serv.UpdateKaryawan(temp)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.Response{
			Message: err.Error(),
			Code:    http.StatusInternalServerError,
		})
	}

	return c.JSON(http.StatusOK, utils.Response{
		Message: "update success",
		Code:    http.StatusOK,
		Data:    resp,
	})
}

func (u *ControllerS) GetKaryawanById(c echo.Context) error {
	id := c.Param("id")
	convId, err := strconv.Atoi(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, utils.Response{
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
	}

	payloads := dto.KaryawanDto{
		KaryawanID: uint(convId),
	}

	resp, err := u.Serv.GetKaryawanById(payloads)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.Response{
			Message: err.Error(),
			Code:    http.StatusInternalServerError,
		})
	}

	return c.JSON(http.StatusOK, utils.Response{
		Message: "success",
		Code:    http.StatusOK,
		Data:    resp,
	})
}

func (u *ControllerS) DeleteKaryawan(c echo.Context) error {
	id := c.Param("id")
	convId, err := strconv.Atoi(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, utils.Response{
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
	}

	payloads := dto.KaryawanDto{
		KaryawanID: uint(convId),
	}

	err_resp := u.Serv.DeleteKaryawan(payloads)

	if err_resp != nil {
		return c.JSON(http.StatusInternalServerError, utils.Response{
			Message: err_resp.Error(),
			Code:    http.StatusInternalServerError,
		})
	}

	return c.JSON(http.StatusOK, utils.Response{
		Message: "success",
		Code:    http.StatusOK,
	})
}
