# beachboyslegacy.github.com

## How to generate templates

We use Jinja2 templates to generate the item views. When you change the template to format the item view in a different way, you should follow the next steps to commit them:

1. Generate the view from the templates with `make template`
2. Add the changes `git add ./items`
3. From this point on commit at discretion and remember to deploy the new `./items` dir.

TIP: You might want to use `make devserver` to view your changes before commiting them.

### Dev environment

We use Virtual Enviroments to separate the packages and Python version from the system's defaults.

The easiest way to develop the `generate.py` script, is to have Python 3.9 installed and run the following steps once:

1. `make venv`
2. `source ./venv/bin/activate`
3. `make dev`

After this, if you want to exit the virtual enviroment, run `deactivate`. Otherwise, whenever you want ot work on this project, just run `source ./venv/bin/activate` and all the packages should be available (along with Python 3.9 under a simple `python` invocation and independent from your system's Python version).
