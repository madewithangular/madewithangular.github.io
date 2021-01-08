# Made With Angular

A showcase of web apps built with Angular

## Submit a site

1. Fork this repository
1. Navigate to **assets/images/projects/**. Create a new directory for your project (eg **my-app/**). Add a a 1280x711 thumbnail JPG image to this new directory.
1. Navigate to **_posts/**. Create a new post for your project (eg **2021-01-01-my-app.md**). Add in these properties to this new post:
    ```
    ---
    layout: site
    title: "My App"
    date: 2021-01-01
    categories: [community]
    version: 5.2.1
    major: 5
    minor: 2
    patch: 1
    slug: my-app
    link: https://myapp.com
    submitter: lalithpolepeddi
    permalink: /sites/:slug
    ---
    ```
1. Send a pull request