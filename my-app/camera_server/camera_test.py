import cv2
from pyzbar.pyzbar import decode
import requests
import time
from flask import Flask, Response, jsonify

app = Flask(__name__)

scanned_barcodes = set()
last_scanned_data = {}

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
@app.route('/last-scan')
def last_scan():
    if last_scanned_data:
        return jsonify(last_scanned_data)
    return jsonify({"message": "No data yet"})

if __name__ == '__main__':
    app.run(port=5000, debug=True)

#scanned_barcodes= set() # store scanned barcode to prevent duplicate request
#
# while True:
#     ret, frame = cap.read()  # Read a frame from the camera
#     if not ret:
#         print("Error: Failed to capture frame.")
#         break

#     # Convert frame to grayscale for better barcode detection
#     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

#     # Decode barcodes in the frame
#     barcodes = decode(gray)

#     for barcode in barcodes:
#         barcode_data = barcode.data.decode("utf-8")  # Extract barcode text
#         barcode_type = barcode.type  # Get barcode type (QR Code, Code 128, etc.)

#         # Get bounding box coordinates
#         x, y, w, h = barcode.rect
#         cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)  # Draw a green box

#         # Display barcode text on screen
#         cv2.putText(frame, f"{barcode_type}: {barcode_data}", (x, y - 10),
#                     cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

#         #print(f"Scanned: {barcode_type} - {barcode_data}")  # Print result in terminal
        
#         #send barcode data to backend only if it hasn't been scanned before 
#         if barcode_data not in scanned_barcodes:
#             scanned_barcodes.add(barcode_data) # this marks barcode as scanned
#             print(f"Scanned Barcode: {barcode_data}, sending to the backend")

#             try:
#                 response = requests.post(API_URL, json={"barcode": barcode_data})
#                 if response.status_code == 200:
#                     print(f"Response from Backend: {response.json()}")
#                 else:
#                     print("Error from Backend:", response.status_code, response.text)
#             except requests.exceptions.RequestException as e:
#                 print("Failed to connect to the Backend",e)

#             # Once a barcode is scanned, close the camera and exit
#             cap.release()  # Release the camera
#             cv2.destroyAllWindows()  # Close any OpenCV windows
#             exit()

#     # Show the live camera feed
#     cv2.imshow("Barcode Scanner", frame)

#     # Press 'q' to exit
#     if cv2.waitKey(1) & 0xFF == ord("q"):
#         print("Quitting...")
#         break

# # Release the camera and close all OpenCV windows
# cap.release()
# cv2.destroyAllWindows()
