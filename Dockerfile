FROM node:18 as react-builder
ARG GITHUB_ACCESS_TOKEN

WORKDIR /work
COPY . ./
COPY deploy.npmrc .npmrc
RUN yarn install && yarn build

FROM node:18-alpine	as production-builder
ARG GITHUB_ACCESS_TOKEN
WORKDIR /work
COPY . ./
COPY deploy.npmrc .npmrc
RUN yarn install --production --ignore-optional

FROM gcr.io/distroless/nodejs:18

EXPOSE 4000
ENV NODE_ENV=production
ENV PORT=4000

WORKDIR /app
COPY --from=production-builder /work/public ./public
COPY --from=production-builder /work/node_modules ./node_modules
COPY --from=production-builder /work/package.json ./
COPY --from=react-builder /work/build ./build
COPY --from=react-builder /work/index.js ./

CMD ["index.js"]
