FROM node:22-alpine

WORKDIR /usr/src/app

# Install required tools
RUN apk add --no-cache wget

# Install minio client (mc) in a single layer
RUN wget https://dl.min.io/client/mc/release/linux-amd64/mc && \
    chmod +x mc && \
    mv mc /usr/local/bin/mc

COPY package*.json ./

# Install dependencies (use 'npm ci' if a package-lock.json exists)
RUN npm ci --only=production

COPY . .

EXPOSE 3000

# Set NODE_ENV to production by default
ENV NODE_ENV=production

CMD ["npm", "start"]