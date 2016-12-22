from flask import Flask, render_template, make_response
from flask_sslify import SSLify
from flask.ext.compress import Compress

app = Flask(__name__)
sslify = SSLify(app)
Compress(app)

@app.route("/")
def index():
  response = make_response(render_template('index.html'))
  response.headers['cache-control'] = 'must_revalidate, public, max-age=3600'
  return response

@app.route("/.well-known/acme-challenge/hNZ2_kEvGZzeJq9-KoG4B6RPQxUOVXW21VCp871w2X4")
def challenge():
  return 'hNZ2_kEvGZzeJq9-KoG4B6RPQxUOVXW21VCp871w2X4.sDEc5hjygivLVxJ96SQ4ihfvpYWKX1VfVx1TIgC7n7M'

if __name__ == "__main__":
  app.run()

  