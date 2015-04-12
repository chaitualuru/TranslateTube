import os
from flask import Flask, request, redirect, url_for, make_response
from flask.ext.cors import CORS, cross_origin
from werkzeug import secure_filename
import soundcloud
from OpenSSL import SSL

ALLOWED_EXTENSIONS = set(['wav'])

app = Flask(__name__)
# cors = CORS(app, resources=r'/', allow_headers='Content-Type')

@app.route('/hello')
@cross_origin()
def hello_world():
	return 'hello_world'

@app.route('/', methods=['GET', 'POST'])
@cross_origin()
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        if file:
            file.save('/tmp/file.wav')
        	# create client object with app and user credentials
            client = soundcloud.Client(client_id='7a85853e93bad9e808b23f3ef4dd78ad', client_secret='50849a08831bade67df2f55af19c50ad', username='translatetube', password='tjR3ZawTbmPD3a')
            track = client.post('/tracks', track = {'title': request.form['id'], 'asset_data': open('/tmp/file.wav', 'rb')})

            resp = make_response(str(track.id))
            resp.headers['Access-Control-Allow-Origin'] = '*'
            return resp
		
if __name__ == '__main__':
	context = ('87917305-localhost.cert', '87917305-localhost.key')
	app.run(host='127.0.0.1', port=5000, ssl_context=context, threaded=True, debug=True)