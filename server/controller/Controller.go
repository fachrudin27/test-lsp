package controller

import "github.com/fachrudin27/test-lsp/service"

type Controller interface{}

type ControllerS struct {
	Serv service.Service
}

func NewController(Service service.Service) *ControllerS {
	return &ControllerS{
		Serv: Service,
	}
}
