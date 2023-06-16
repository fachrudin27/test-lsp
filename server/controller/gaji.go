package controller

import (
	"net/http"
	"strconv"

	"github.com/fachrudin27/test-lsp/dto"
	"github.com/fachrudin27/test-lsp/utils"
	"github.com/labstack/echo"
)

func (u *ControllerS) CreateGaji(c echo.Context) error {

	var payloads dto.GajiDto
	if err := c.Bind(&payloads); err != nil {
		return err
	}

	if err := c.Validate(payloads); err != nil {
		return c.JSON(http.StatusBadRequest, utils.Response{
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
	}
	resp, err := u.Serv.CreateGaji(payloads)

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

func (u *ControllerS) GetGajiById(c echo.Context) error {
	id := c.Param("id")
	convId, err := strconv.Atoi(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, utils.Response{
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
	}

	payloads := dto.GajiDto{
		GajiId: uint(convId),
	}

	resp, err := u.Serv.GetGajiById(payloads)

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

func (u *ControllerS) GetGajiByIdKaryawan(c echo.Context) error {
	id := c.Param("id")
	convId, err := strconv.Atoi(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, utils.Response{
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
	}

	payloads := dto.GajiDto{
		KaryawanId: uint(convId),
	}

	resp, err := u.Serv.GetGajiByIdKaryawan(payloads)

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

func (u *ControllerS) UpdateGaji(c echo.Context) error {
	id := c.Param("id")
	convId, err := strconv.Atoi(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, utils.Response{
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
	}

	var payloads dto.GajiDto

	if err := c.Bind(&payloads); err != nil {
		return err
	}

	if err := c.Validate(payloads); err != nil {
		return c.JSON(http.StatusBadRequest, utils.Response{
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
	}

	temp := dto.GajiDto{
		GajiId:       uint(convId),
		KaryawanId:   payloads.KaryawanId,
		GajiPokok:    payloads.GajiPokok,
		Bonus:        payloads.Bonus,
		Pph:          payloads.Pph,
		GajiDiterima: payloads.GajiDiterima,
		TglGaji:      payloads.TglGaji,
	}

	resp, err := u.Serv.UpdateGaji(temp)

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

func (u *ControllerS) DeleteGaji(c echo.Context) error {
	id := c.Param("id")
	convId, err := strconv.Atoi(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, utils.Response{
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
	}

	payloads := dto.GajiDto{
		GajiId: uint(convId),
	}

	err = u.Serv.DeleteGaji(payloads)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.Response{
			Message: err.Error(),
			Code:    http.StatusInternalServerError,
		})
	}

	return c.JSON(http.StatusOK, utils.Response{
		Message: "success",
		Code:    http.StatusOK,
	})
}
