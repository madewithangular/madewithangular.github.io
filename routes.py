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

@app.route("/.well-known/acme-challenge/aZJ4KW4R8ZpLKYRdVn2WAJ-NqEGZ4-camsRQO-KV5lQ")
def challenge():
  return 'aZJ4KW4R8ZpLKYRdVn2WAJ-NqEGZ4-camsRQO-KV5lQ.pFKi092ef3zDNfUarMXSdTZ75h3yeZSqvDDjwPaXxRE'

if __name__ == "__main__":
  app.run()

  