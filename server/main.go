package main

import (
	"log"
	"os"

	"github.com/fachrudin27/test-lsp/databases"
	"github.com/fachrudin27/test-lsp/router"

	"github.com/joho/godotenv"
	"github.com/labstack/echo"
)

func main() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	databases.InitDB()

	e := echo.New()

	router.New(e, databases.DB)

	port := os.Getenv("PORT")

	_ = e.Start(port)

}
