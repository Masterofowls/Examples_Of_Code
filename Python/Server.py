from http.server import BaseHTTPRequestHandler, HTTPServer
import json


HOST = "127.0.0.1"
PORT = 8000


class SimpleHandler(BaseHTTPRequestHandler):
    def _send_json(self, status_code: int, data: dict) -> None:
        payload = json.dumps(data).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def do_GET(self) -> None:
        if self.path == "/":
            self._send_json(200, {"message": "Hello from simple Python server!"})
            return

        if self.path == "/health":
            self._send_json(200, {"status": "ok"})
            return

        self._send_json(404, {"error": "Not found"})

    def log_message(self, format_str: str, *args) -> None:
        # Cleaner console output
        print(f"{self.address_string()} - {format_str % args}")


def main() -> None:
    server = HTTPServer((HOST, PORT), SimpleHandler)
    print(f"Server running at http://{HOST}:{PORT}")
    print("Endpoints: / and /health")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
