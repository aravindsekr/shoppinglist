FROM node:9 as builder
RUN mkdir /shoppinglist
WORKDIR /shoppinglist
COPY shoppinglist .

RUN npm install --quiet
RUN npm run build

# Copy built app into nginx container
FROM nginx:1.13.5
COPY --from=builder /shoppinglist/build /usr/share/nginx/html

EXPOSE 80