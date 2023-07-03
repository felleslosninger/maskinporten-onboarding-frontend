FROM node:18.12.1 as build
WORKDIR /app
COPY package.json yarn.lock ./

RUN npm set progress=false && \
  npm config set depth 0 && \
  yarn install --frozen-lockfile



COPY tsconfig.json ./
COPY src ./src
COPY public ./public
RUN npm run build

FROM node:18.12.1-alpine

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
RUN npm install -g serve

RUN mkdir /app

RUN addgroup -g 1001 -S app && \
  adduser -u 1001 -S app -G app && \
  chown -R app:app /app && \
  chmod 770 /app

USER app:app
WORKDIR /app

COPY --chown=app:app --from=build /app/build ./

EXPOSE 3000
CMD serve -s