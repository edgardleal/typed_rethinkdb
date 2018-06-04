
node_modules/: package.json
	yarn install


index.js: index.ts
	yarn tsc

build: index.js
	node node_modules/babel-cli/bin/babel.js index.js -o index.js

publish: build
	npm publish 
