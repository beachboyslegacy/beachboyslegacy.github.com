.PHONY: all
all:
	python -m pip install -r requirements.txt

.PHONY: dev
dev:
	python -m pip install -r dev_requirements.txt

.PHONY: venv
venv:
	python3.9 -m venv venv

.PHONY: devserver
devserver:
	python -m http.server --directory www
