FROM node:12.13

WORKDIR /app
RUN mkdir dist

COPY package.json .

# RUN npm set audit false
RUN npm set audit false && npm install
COPY . .
# RUN npm run start:
CMD [ "npm", "run", "start" ]