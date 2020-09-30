FROM node:12.18-stretch As build-stage

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

COPY . .

RUN npm run build

FROM node:12.18-stretch as production-stage

# Copy necessary files
COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/package*.json ./
COPY --from=build-stage /app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
