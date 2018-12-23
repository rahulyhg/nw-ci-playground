FROM circleci/node:10.12.0-browsers

WORKDIR /usr/src/nightwatch

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY . /usr/src/nightwatch

CMD ["/bin/sh"]
