from flask import Flask, render_template, make_response
from flask_sslify import SSLify
from flask.ext.compress import Compress

app = Flask(__name__)
# sslify = SSLify(app)
Compress(app)

@app.route("/")
def index():
  response = make_response(render_template('index.html'))
  response.headers['cache-control'] = 'must_revalidate, public, max-age=3600'
  return response

@app.route("/.well-known/acme-challenge/h1EhpBaGjoazWCcnLyMsJlBlpKZ7sW6xoWYs6H2bpok")
def challenge():
  return 'h1EhpBaGjoazWCcnLyMsJlBlpKZ7sW6xoWYs6H2bpok.2mZpyfJC5pEsqNCuUu5L5CqtlIz5Khv2t64Cqk5DrqU'

if __name__ == "__main__":
  app.run()