from flask import Flask, request, jsonify, send_file
from _functions import requestPrompt
from flask_cors import CORS

app = Flask(__name__, static_url_path='/images', static_folder='images')
CORS(app) 

@app.route('/api/', methods=['GET'])
def default():
    prompt = request.args.get('prompt', default='', type=str)
    res = requestPrompt(prompt)
    if res != None:
    # res = '/images/17711386801.jpg'
        return jsonify({'prompt': prompt, 'res': res, 'message': 'Success', 'status': 'success'})
    else:
        return jsonify({'prompt': prompt, 'res': '', 'message': 'Error: Please try again...', 'status': 'error'})

@app.route('/api/image/', methods=['GET'])
def download():
    image = request.args.get('download', default='', type=str)
    return send_file(image, as_attachment=True);

if __name__ == '__main__':
    app.run(debug=True)
