package controller

import (
	"net/http"

	"github.com/fachrudin27/test-lsp/dto"
	"github.com/fachrudin27/test-lsp/utils"
	"github.com/labstack/echo"
)

func (u *ControllerS) CreateReport(c echo.Context) error {
	var payloads dto.LaporanDto

	if err := c.Bind(&payloads); err != nil {
		return err
	}

	if err := c.Validate(payloads); err != nil {
		return c.JSON(http.StatusBadRequest, utils.Response{
			Message: err.Error(),
			Code:    http.StatusBadRequest,
		})
	}
	temp := dto.LaporanDto{
		StartDate: payloads.StartDate,
		EndDate:   payloads.EndDate,
	}
	resp, err := u.Serv.CreateReport(temp)
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
