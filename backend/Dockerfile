FROM node:latest AS base

# Set the working directory within the container
WORKDIR /app

COPY package*.json ./

RUN npm install --include=dev

# Stage 2: developpement stage
FROM base AS dev

COPY . .

ENV NODE_ENV=development

EXPOSE ${SERVER_PORT}

CMD ["npm", "run", "dev"]

# Stage 3: Production stage
# FROM base AS prod

# COPY . .

# ENV NODE_PATH=./build

# ENV SERVER_PORT=3000

# RUN npm run build

# EXPOSE ${SERVER_PORT}

# Command to run the application in production mode
# CMD ["npm", "run", "start"]