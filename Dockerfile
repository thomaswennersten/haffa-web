FROM node:18 as compiler
ARG GITHUB_ACCESS_TOKEN

WORKDIR /work
COPY . .
COPY deploy.npmrc .npmrc
RUN yarn install && yarn build

FROM node:18-alpine	as optimizer
ARG GITHUB_ACCESS_TOKEN
WORKDIR /work
COPY . .
COPY deploy.npmrc .npmrc
RUN yarn install --production --ignore-optional

FROM gcr.io/distroless/nodejs:18

EXPOSE 4000
ENV NODE_ENV=production
ENV PORT=4000

WORKDIR /usr/src/app
COPY --from=optimizer /work/public ./public
COPY --from=optimizer /work/node_modules ./node_modules
COPY --from=optimizer /work/package.json ./
COPY --from=compiler /work/build ./build
COPY --from=compiler /work/index.js ./

CMD ["index.js"]
