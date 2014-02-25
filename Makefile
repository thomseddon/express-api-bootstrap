
ENV_TEST = NODE_ENV=test
ENV_DEV = NODE_ENV=development

test:
	$(ENV_TEST) mocha --bail
test-all:
	$(ENV_TEST) mocha
test-spec:
	$(ENV_TEST) mocha --reporter spec
test-dev:
	$(ENV_DEV) mocha

.PHONY: test test-all test-spec test-dev
