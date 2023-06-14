package controller

import (
	"net/http"
	"strconv"

	"github.com/fachrudin27/test-lsp/dto"
	"github.com/fachrudin27/test-lsp/utils"
	"github.com/labstack/echo"
)

func (u *ControllerS) CreateJabatan(c echo.Context) error {
	var payloads dto.JabatanDto

	if err := c.Bind(&payloads); err != nil {
		return err
	}

	if err := c.Validate(payloads); err != nil {
		return c.JSON(http.StatusBadRequest, utils.Response{
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
	}

	resp, err := u.Serv.CreateJabatan(payloads)

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

func (u *ControllerS) GetAllJabatan(c echo.Context) error {
	resp, err := u.Serv.GetAllJabatan()
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

func (u *ControllerS) UpdateJabatan(c echo.Context) error {
	id := c.Param("id")
	convId, err := strconv.Atoi(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, utils.Response{
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
	}

	var payloads dto.JabatanUpdate

	if err := c.Bind(&payloads); err != nil {
		return err
	}

	if err := c.Validate(payloads); err != nil {
		return c.JSON(http.StatusBadRequest, utils.Response{
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
	}

	temp := dto.JabatanUpdate{
		JabatanId:   uint(convId),
		NamaJabatan: payloads.NamaJabatan,
		Bonus:       payloads.Bonus,
	}

	resp, err := u.Serv.UpdateJabatan(temp)

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

func (u *ControllerS) GetJabatanById(c echo.Context) error {
	id := c.Param("id")
	convId, err := strconv.Atoi(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, utils.Response{
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
	}

	payloads := dto.JabatanUpdate{
		JabatanId: uint(convId),
	}

	resp, err := u.Serv.GetJabatanById(payloads)

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
