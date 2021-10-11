package main

import (
	"fmt"
	"todo-with-go-fiber/database"
	"todo-with-go-fiber/models"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"gorm.io/driver/postgres"
	_ "gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func helloWorld(c *fiber.Ctx) error {
	return c.SendString("Hello World")
}

func initDatabase() {
	var err error
	dns := "host=localhost user=postgres  password=qwe123 dbname=goTodo port=5432"
	database.DBConn, err = gorm.Open(postgres.Open(dns), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database")
	}

	fmt.Println("Database connected")
	database.DBConn.AutoMigrate(&models.Todo{})
	fmt.Println("Migrated DB")
}

func setUpRoutes(app *fiber.App) {
	app.Get("/todos", models.GetTodos)
	app.Post("/todos", models.CreateTodo)
	app.Get("/todos/:id", models.GetTodoById)
	app.Put("/todos/:id", models.UpdateTodo)
	app.Delete("/todos/:id", models.DeleteTodo)
}

func main() {
	app := fiber.New()
	app.Use(cors.New())
	initDatabase()
	app.Get("/", helloWorld)
	setUpRoutes(app)
	app.Listen(":8000")
}
