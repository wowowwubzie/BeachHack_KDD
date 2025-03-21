import cv2
import numpy as np
from pyzbar.pyzbar import decode

# Open the default camera (0 = built-in webcam, try 1 if you have an external camera)
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Could not open camera.")
    exit()

while True:
    ret, frame = cap.read()  # Read a frame from the camera
    if not ret:
        print("Error: Failed to capture frame.")
        break

    # Convert frame to grayscale for better barcode detection
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Decode barcodes in the frame
    barcodes = decode(gray)

    for barcode in barcodes:
        barcode_data = barcode.data.decode("utf-8")  # Extract barcode text
        barcode_type = barcode.type  # Get barcode type (QR Code, Code 128, etc.)

        # Get bounding box coordinates
        x, y, w, h = barcode.rect
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)  # Draw a green box

        # Display barcode text on screen
        cv2.putText(frame, f"{barcode_type}: {barcode_data}", (x, y - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

        print(f"Scanned: {barcode_type} - {barcode_data}")  # Print result in terminal

    # Show the live camera feed
    cv2.imshow("Barcode Scanner", frame)

    # Press 'q' to exit
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

# Release the camera and close all OpenCV windows
cap.release()
cv2.destroyAllWindows()


# import cv2

# # Open the default camera (0 = built-in webcam, try 1 if you have an external camera)
# cap = cv2.VideoCapture(0)

# if not cap.isOpened():
#     print("Error: Could not open camera.")
#     exit()

# while True:
#     ret, frame = cap.read()  # Read a frame from the camera
#     if not ret:
#         print("Error: Failed to capture frame.")
#         break

#     cv2.imshow("Camera Feed", frame)  # Show the video feed in a window

#     # Press 'q' to exit the camera window
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# # Release the camera and close all windows
# cap.release()
# cv2.destroyAllWindows()
