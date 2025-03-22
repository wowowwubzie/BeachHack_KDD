import cv2
from pyzbar.pyzbar import decode
import requests
import time
from flask import Flask, Response, jsonify

app = Flask(__name__)

scanned_barcodes = set()

API_URL = "http://localhost:5001/nutrition"

def generate_frames():
    cap = cv2.VideoCapture(0)
    last_scanned = time.time()
    cooldown = 5  # seconds

    while True:
        success, frame = cap.read()
        if not success:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        barcodes = decode(gray)

        for barcode in barcodes:
            x, y, w, h = barcode.rect
            barcode_data = barcode.data.decode("utf-8")
            barcode_type = barcode.type

            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
            text = f"{barcode_data} ({barcode_type})"
            cv2.putText(frame, text, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX,
                        0.6, (0, 255, 0), 2)

            current_time = time.time()
            if barcode_data not in scanned_barcodes or current_time - last_scanned > cooldown:
                print(f"Drawing box for barcode: {barcode_data}")
                scanned_barcodes.add(barcode_data)
                last_scanned = current_time
                print("Scanned Barcode:", barcode_data)

                try:
                    response = requests.post(API_URL, json={"barcode": barcode_data})
                    print("Sent to nutrition backend:", response.status_code, response.json())
                except Exception as e:
                    print("Error sending barcode to backend:", e)

                cap.release()
                cv2.destroyAllWindows()
                return

        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(port=5000, debug=True)
