from flask import Flask, render_template, request, redirect
import requests
# import requests_toolbelt.adapters.appengine
import json
from flask_sslify import SSLify

app = Flask(__name__)

sslify = SSLify(app)

# Use the App Engine Requests adapter. This makes sure that Requests uses
# URLFetch.
# requests_toolbelt.adapters.appengine.monkeypatch()

@app.route("/")
def index():

  categories = {
    "google": {"name": "By Google", "sites": []},
    "books-reference": {"name": "Books & Reference", "sites": []},
    "business": {"name": "Business", "sites": []},
    "communication": {"name": "Communication", "sites": []},
    "education": {"name": "Education", "sites": []},
    "entertainment": {"name": "Entertainment", "sites": []},
    "finance": {"name": "Finance", "sites": []},
    "health-fitness": {"name": "Health & Fitness", "sites": []},
    "lifestyle": {"name": "Lifestyle", "sites": []},
    "media-video": {"name": "Media & Video", "sites": []},
    "music-audio": {"name": "Music & Audio", "sites": []},
    "news-magazines": {"name": "News & Magazines", "sites": []},
    "photography": {"name": "Photography", "sites": []},
    "productivity": {"name": "Productivity", "sites": []},
    "shopping": {"name": "Shopping", "sites": []},
    "social": {"name": "Social", "sites": []},
    "sports": {"name": "Sports", "sites": []},
    "tools": {"name": "Tools", "sites": []},
    "travel-local": {"name": "Travel & Local", "sites": []},
    "transportation": {"name": "Transportation", "sites": []},
    "weather": {"name": "Weather", "sites": []},
    "community": {"name": "From the Community", "sites": []}
  }

  r = requests.get('https://s3.amazonaws.com/madewithangular.com/projects.json')
  projects = json.loads(r.text)

  for project in reversed(projects):
    for tag in project['tags']:
      categories[tag]["sites"].append(project)

  return render_template('index.html', categories=categories)

@app.route("/categories/<category>")
def categories(category):

  categories = {
    "google": {"name": "By Google", "sites": []},
    "books-reference": {"name": "Books & Reference", "sites": []},
    "business": {"name": "Business", "sites": []},
    "communication": {"name": "Communication", "sites": []},
    "education": {"name": "Education", "sites": []},
    "entertainment": {"name": "Entertainment", "sites": []},
    "finance": {"name": "Finance", "sites": []},
    "health-fitness": {"name": "Health & Fitness", "sites": []},
    "lifestyle": {"name": "Lifestyle", "sites": []},
    "media-video": {"name": "Media & Video", "sites": []},
    "music-audio": {"name": "Music & Audio", "sites": []},
    "news-magazines": {"name": "News & Magazines", "sites": []},
    "photography": {"name": "Photography", "sites": []},
    "productivity": {"name": "Productivity", "sites": []},
    "shopping": {"name": "Shopping", "sites": []},
    "social": {"name": "Social", "sites": []},
    "sports": {"name": "Sports", "sites": []},
    "tools": {"name": "Tools", "sites": []},
    "travel-local": {"name": "Travel & Local", "sites": []},
    "transportation": {"name": "Transportation", "sites": []},
    "weather": {"name": "Weather", "sites": []},
    "community": {"name": "From the Community", "sites": []}
  }

  r = requests.get('https://s3.amazonaws.com/madewithangular.com/projects.json')
  projects = json.loads(r.text)

  for project in reversed(projects):
    for tag in project['tags']:
      if tag == category:
        categories[tag]["sites"].append(project)

  return render_template('category.html', category=categories[category])

@app.route("/sites/<site>")
def sites(site):

  r = requests.get('https://s3.amazonaws.com/madewithangular.com/projects.json')
  projects = json.loads(r.text)

  s = {}
  for project in projects:
    if project['slug'] == site:
      s = project

  print s

  return render_template('site.html', site=s)

@app.route("/about")
def about():
  return render_template('about.html')

@app.route("/sitemap.xml")
def sitemap():

  categories = {
    "google": {"name": "By Google", "sites": []},
    "books-reference": {"name": "Books & Reference", "sites": []},
    "business": {"name": "Business", "sites": []},
    "communication": {"name": "Communication", "sites": []},
    "education": {"name": "Education", "sites": []},
    "entertainment": {"name": "Entertainment", "sites": []},
    "finance": {"name": "Finance", "sites": []},
    "health-fitness": {"name": "Health & Fitness", "sites": []},
    "lifestyle": {"name": "Lifestyle", "sites": []},
    "media-video": {"name": "Media & Video", "sites": []},
    "music-audio": {"name": "Music & Audio", "sites": []},
    "news-magazines": {"name": "News & Magazines", "sites": []},
    "photography": {"name": "Photography", "sites": []},
    "productivity": {"name": "Productivity", "sites": []},
    "shopping": {"name": "Shopping", "sites": []},
    "social": {"name": "Social", "sites": []},
    "sports": {"name": "Sports", "sites": []},
    "tools": {"name": "Tools", "sites": []},
    "travel-local": {"name": "Travel & Local", "sites": []},
    "transportation": {"name": "Transportation", "sites": []},
    "weather": {"name": "Weather", "sites": []},
    "community": {"name": "From the Community", "sites": []}
  }

  r = requests.get('https://s3.amazonaws.com/madewithangular.com/projects.json')
  projects = json.loads(r.text)

  return render_template('sitemap.xml', categories=categories, projects=projects), {'Content-Type': 'application/xml'}


@app.route("/.well-known/acme-challenge/_wKp2_4KpNYg0EiXuQ7RujdkVYjTgsghf6iwtwdTn2M")
def challenge():
  return '_wKp2_4KpNYg0EiXuQ7RujdkVYjTgsghf6iwtwdTn2M.T936h79JYw_nQPwE6BKarlzCX8026Rfo_hdcnMPeIVA'

if __name__ == "__main__":
  app.run(debug=True)