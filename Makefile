.SILENT:
.PHONY: test

# Install dependencies
install:
	npm install

# Launch watch
watch:
	npm run watch

# Launch dev server
start:
	npm run start

# Build lib
build:
	npm run build

# Preview lib
preview:
	npm run preview

# Node demo
node:
	node demo.js

# Lint and code style fix
lint:
	npm run lint

# Test
test: build
	npm run test

# Publish package
publish: build
	npm publish . --access public
