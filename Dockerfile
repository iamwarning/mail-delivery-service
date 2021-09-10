FROM node:14.17.6-alpine3.14 AS builder
RUN npm install -g @nestjs/cli && mkdir /app
WORKDIR /app
COPY . ./
RUN npm install --only=production
RUN npm run build && npm prune --production


FROM node:14.17.6-alpine3.14 AS production
LABEL author="Jorgel", url="https://jorgel.io/"
WORKDIR /api
ENV NODE_ENV=production
USER node
COPY --from=builder /app/dist/ /api/dist/
COPY --from=builder /app/node_modules /api/node_modules/
EXPOSE 6520
CMD ["node", "dist/main.js"]
