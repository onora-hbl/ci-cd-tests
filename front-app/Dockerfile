######################
# Build for Local dev#
######################

FROM node:latest AS dev
ENV PNPM_HOME="/ppnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Create app directory and set it as our working directory for subsequent operation
WORKDIR /usr/src/app

# Copy application dependency to the container image.
COPY --chown=node:node package.json pnpm-lock.yaml ./

# Install with 'npm ci' (see: https://stackoverflow.com/questions/52499617/what-is-the-difference-between-npm-install-and-npm-ci)
RUN pnpm i

# Copy the app source into the image
COPY --chown=node:node . .

CMD [ "pnpm", "run", "dev" ]

FROM node:latest AS build
ENV PNPM_HOME="/ppnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/src/app

COPY --chown=node:node --from=dev /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

FROM nginx:latest AS production
ENV VITE_BACK_URL="$VITE_BACK_URL"

COPY ./conf/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
