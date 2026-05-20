import turtle


def draw_square(t: turtle.Turtle, size: int) -> None:
    for _ in range(4):
        t.forward(size)
        t.right(90)


def main() -> None:
    screen = turtle.Screen()
    screen.title("Python Turtle Example")
    screen.bgcolor("white")

    t = turtle.Turtle()
    t.speed(5)
    t.pensize(3)
    t.color("blue")

    # Draw first square
    draw_square(t, 100)

    # Move and draw second square
    t.penup()
    t.goto(150, 0)
    t.pendown()
    t.color("red")
    draw_square(t, 100)

    # Write text
    t.penup()
    t.goto(-20, -140)
    t.color("black")
    t.write("Hello Turtle!", font=("Arial", 16, "bold"))

    screen.mainloop()


if __name__ == "__main__":
    main()
