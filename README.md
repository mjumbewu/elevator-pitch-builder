Elevator Pitch Builder
======================

This is a recreation of the Harvard Business School's Elevator Pitch Builder (which seems to no longer be available).

Installation & Usage
--------------------

To push your own version to gh-pages, first fork this repo, then:

```bash
git clone git@github.com:<your-username>/elevator-pitch-builder.git
cd elevator-pitch-builder
git clone -b gh-pages git@github.com:<your-username>/elevator-pitch-builder.git build
```

To make and see changes locally:

```bash
npm install
bower install
grunt serve
```

To update your gh-pages version, first make your desired changes, then:

```bash
git add .
git commit -m "<Summary of your changes>"
git push origin master

grunt build

cd build
git add .
git commit -m "<Summary of your changes>"
git push origin gh-pages
```