from pynput import keyboard
from flask import Flask, jsonify, request
from flask_cors import CORS

import requests
import time
import threading

app = Flask(__name__)
cors = CORS(app)

key_pressed = [""]


@app.route('/key')
def get_key_pressed():
    global key_pressed
    return jsonify({"keys": key_pressed})


@app.route('/key/clear')
def clear_key_mem():
    global key_pressed

    key_pressed = []
    return jsonify({"msg": "successfully cleared"})


def shutdown_server():
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()


@app.route('/shutdown', methods=['POST'])
def shutdown():
    shutdown_server()
    return 'Server shutting down...'


def on_press(key):
    global key_pressed
    key_pressed.append(str(key))


def on_release(key):
    if key == keyboard.Key.esc:
        return False


def listener_thread():
    with keyboard.Listener(on_press=on_press, on_release=on_release) as listener:
        listener.join()


if __name__ == "__main__":
    threading.Thread(target=listener_thread).start()
    app.run(port=5088, debug=True)
