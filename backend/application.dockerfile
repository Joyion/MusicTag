FROM node:latest
WORKDIR ../../backend
COPY package*.json ./
RUN npm ci 
EXPOSE ${PORT:-9000}
COPY . .
CMD ["npm", "start"]