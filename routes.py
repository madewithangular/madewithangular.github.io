from flask import Flask, render_template, request, redirect, url_for
import requests
import json
from flask_sslify import SSLify

app = Flask(__name__)

sslify = SSLify(app)

@app.route("/")
def index():
  r = requests.get('https://s3.amazonaws.com/madewithangular.com/projects.json')
  projects = json.loads(r.text)

  sites = []
  for project in reversed(projects):
    if 'community' not in project['tags']:
      sites.append(project)

  return render_template('index.html', sites=sites[:20])

@app.route("/categories/<category>")
def categories(category):

  categories = {
    'google': 'By Google',
    'microsoft': 'By Microsoft',
    'fortune-500': 'Fortune 500',
    'communication': 'Communication',
    'developer-tools': 'Developer Tools',
    'education': 'Education',
    'entertainment': 'Entertainment',
    'finance': 'Finance',
    'food-drink': 'Food and drink',
    'health-fitness': 'Health and fitness',
    'lifestyle': 'Lifestyle',
    'medical': 'Medical',
    'sports': 'Sports',
    'transportation': 'Transportation',
    'travel': 'Travel',
    'community': 'From the community',

    'angularjs-1': 'AngularJS 1.x',
    'angular-2': 'Angular 2.x',
    'angular-3': 'Angular 3.x',
    'angular-4': 'Angular 4.x',
    'angular-5': 'Angular 5.x',
  }

  if category in categories:
    category_name = categories[category]
  else:
    return redirect(url_for('index'))

  r = requests.get('https://s3.amazonaws.com/madewithangular.com/projects.json')
  projects = json.loads(r.text)

  sites = []
  for project in reversed(projects):
    if 'angular' in category:
      version = category.split('-')[1]
      if version == project['version']['major']:
        sites.append(project)
    else:
      if category in project['tags']:
        sites.append(project)

  return render_template('category.html', sites=sites[:20], category_name=category_name)

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


@app.route("/.well-known/acme-challenge/2Q_gQPj6alcePTgaCIWfealrQApdJaSd8fm9qGuKL_c")
def challenge():
  return '2Q_gQPj6alcePTgaCIWfealrQApdJaSd8fm9qGuKL_c.MRFhsthfGP01vjhBuHPi-M7sw1h4vprbQbeIPor4zkA'

if __name__ == "__main__":
  app.run(debug=True)