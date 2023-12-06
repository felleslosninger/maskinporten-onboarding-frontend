FROM node:20.8.1 as build
WORKDIR /app
COPY package.json yarn.lock ./

RUN npm set progress=false && \
  npm config set depth 0 && \
  yarn install --frozen-lockfile

COPY tsconfig.json ./
COPY src ./src
COPY public ./public

ENV CI=true
RUN npm run test
ENV CI=false
RUN npm run build

FROM node:20.8.1-alpine3.18
RUN apk add gettext

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PORT=8080
ENV PATH=$PATH:/home/node/.npm-global/bin
RUN npm install -g serve

WORKDIR /app

COPY --from=build /app/build ./
COPY --chmod=755 entrypoint.sh template.config.js ./

RUN chmod 777 ./config.js # We need to modify this file in entrypoint.sh
RUN dos2unix entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
EXPOSE 8080
