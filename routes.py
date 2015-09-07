from flask import Flask, render_template
from flask_sslify import SSLify
from flask.ext.compress import Compress

app = Flask(__name__)
sslify = SSLify(app)
Compress(app)

@app.route("/")
def hello():
  return render_template('index.html')

if __name__ == "__main__":
  app.run()
