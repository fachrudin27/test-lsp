package router

import (
	"github.com/fachrudin27/test-lsp/controller"
	m "github.com/fachrudin27/test-lsp/middleware"
	"github.com/fachrudin27/test-lsp/repository"
	"github.com/fachrudin27/test-lsp/service"
	"github.com/fachrudin27/test-lsp/utils"
	"github.com/go-playground/validator"
	"github.com/labstack/echo"
	"gorm.io/gorm"
)

func New(e *echo.Echo, db *gorm.DB) {
	m.LogMiddleware(e)
	e.Validator = &utils.CustomValidator{Validator: validator.New()}

	// Connect Repository
	repository := repository.NewRepository(db)
	// Connect Service
	service := service.NewService(repository)
	// Connect Controller
	controller := controller.NewController(service)

	e.GET("/", func(c echo.Context) error {
		return c.String(200, "ping")
	})

	v1 := e.Group("/v1")

	jabatan := v1.Group("/jabatan")
	{
		jabatan.GET("/", controller.GetAllJabatan)
		jabatan.GET("/:id", controller.GetJabatanById)
		jabatan.POST("/", controller.CreateJabatan)
		jabatan.PUT("/:id", controller.UpdateJabatan)
	}
	karyawan := v1.Group("/karyawan")
	{
		karyawan.GET("/", controller.GetAllKaryawan)
		karyawan.GET("/:id", controller.GetKaryawanById)
		karyawan.POST("/", controller.CreateKaryawan)
		karyawan.PUT("/:id", controller.UpdateKaryawan)
		karyawan.DELETE("/:id", controller.DeleteKaryawan)
	}
	gaji := v1.Group("/gaji")
	{
		gaji.POST("/", controller.CreateGaji)
		gaji.GET("/:id", controller.GetGajiById)
		gaji.GET("/karyawan/:id", controller.GetGajiByIdKaryawan)
		gaji.PUT("/:id", controller.UpdateGaji)
		gaji.DELETE("/:id", controller.DeleteGaji)
	}
}
