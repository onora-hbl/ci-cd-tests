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
COPY --chown=node:node package*.json ./

# Install with 'pnpm i' (see: https://stackoverflow.com/questions/52499617/what-is-the-difference-between-pnpm-install-and-pnpm-ci)
RUN pnpm i

# Copy the app source into the image
COPY --chown=node:node . .

CMD [ "pnpm", "start:dev" ]

FROM node:latest AS production
ENV PNPM_HOME="/ppnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Create app directory and set it as our working directory for subsequent operation
WORKDIR /usr/src/app

# Copy application dependency to the container image.
COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=dev /usr/src/app/node_modules ./node_modules

# Copy the app source into the image
COPY --chown=node:node . .

RUN pnpm build

ENV NODE_ENV production

# Running `pnpm i` removes the existing node_modules directory.
# Passing in --only=production ensures that only the production dependencies are installed.
# This ensures that the node_modules directory is as optimized as possible.
RUN pnpm i --only=production

# Start the server using the production build
CMD [ "pnpm", "start:prod" ]