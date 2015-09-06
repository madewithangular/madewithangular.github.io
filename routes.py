from flask import Flask, render_template
from flask_sslify import SSLify

app = Flask(__name__)
sslify = SSLify(app, subdomains=True)

@app.route("/")
def hello():
  return render_template('index.html')

if __name__ == "__main__":
  app.run()
