import sys
from PyQt6.QtWidgets import (
    QApplication,
    QLabel,
    QLineEdit,
    QPushButton,
    QVBoxLayout,
    QWidget,
)


class MainWindow(QWidget):
    def __init__(self) -> None:
        super().__init__()
        self.setWindowTitle("Simple PyQt Example")
        self.setMinimumWidth(320)

        self.label = QLabel("Enter your name:")
        self.input_box = QLineEdit()
        self.input_box.setPlaceholderText("Type here...")

        self.button = QPushButton("Greet")
        self.button.clicked.connect(self.show_greeting)

        self.result_label = QLabel("")

        layout = QVBoxLayout()
        layout.addWidget(self.label)
        layout.addWidget(self.input_box)
        layout.addWidget(self.button)
        layout.addWidget(self.result_label)

        self.setLayout(layout)

    def show_greeting(self) -> None:
        name = self.input_box.text().strip()
        if not name:
            self.result_label.setText("Please enter a name.")
            return

        self.result_label.setText(f"Hello, {name}! Welcome to PyQt.")


def main() -> None:
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec())


if __name__ == "__main__":
    main()
