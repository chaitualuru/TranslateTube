import os
from flask import Flask, request, redirect, url_for
from werkzeug import secure_filename
import soundcloud

UPLOAD_FOLDER = '/path/to/the/uploads'
ALLOWED_EXTENSIONS = set([mp3, wav])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        if file:


# create client object with app and user credentials
client = soundcloud.Client(client_id='7a85853e93bad9e808b23f3ef4dd78ad',
                           client_secret='50849a08831bade67df2f55af19c50ad',
                           username='translatetube',
                           password='tjR3ZawTbmPD3a')

# upload audio file
track = client.post('/tracks', track={
    'title': 'This is my sound',
    'asset_data': open('file.mp3', 'rb')
})

# print track link
print track.permalink_url