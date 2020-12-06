import serial
import time

if __name__ == '__main__':
	print("connecting")
	ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)
	print("connected")
	ser.flush()
	while True:
		print("writing")
		ser.write(b"Hello from Raspberry Pi!\n")
		line = ser.readline().decode('utf-8').rstrip()
		print(line)
		time.sleep(1)

