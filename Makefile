.PHONY: all
all:
	python -m pip install -r requirements.txt

.PHONY: dev
dev: all
dev:
	python -m pip install -r dev_requirements.txt

.PHONY: venv
venv:
	python3.9 -m venv venv

.PHONY: devserver
devserver:
	python -m http.server --directory .

.PHONY: templates
templates:
	python generate.py ./js/data.json --output-dir . --templates ./templates

.PHONY: templates-reset
templates-reset:
	git checkout master items

.PHONY: build
build: all
build: templates