import socketio
import os

sio = socketio.Client()

@sio.event
def connect():
    '''connect to server'''
    print('connected to server')

@sio.on('update')
def update(data):
    '''on update get data and update file'''

    filename = 'text.txt'
    with open(filename, 'w') as file_object:
        file_object.write(data['text'] +'\n')

    filename = 'background.txt'
    with open(filename, 'w') as file_object:
        file_object.write(str(data['background'])+'\n')

    filename = 'color.txt'
    with open(filename, 'w') as file_object:
        file_object.write(str(data['color'])+'\n')

    filename = 'pid.txt'
    try:
        # Open the file in read mode
        with open(filename, 'r') as file_object:
            for line in file_object:
                os.kill(int(line), 9)
        os.system('python3 led.py')
    except (FileNotFoundError, ProcessLookupError) as e:
        #os.system('sudo killall python3')
        os.system('python3 led.py')

sio.connect('https://gooseapp.herokuapp.com/')
sio.wait()
