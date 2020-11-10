.PHONY: dev
dev:
	python -m pip install -r requirements.txt

.PHONY: venv
venv:
	python -m venv venv
