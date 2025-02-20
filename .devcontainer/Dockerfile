FROM mcr.microsoft.com/devcontainers/javascript-node:18

# Install PostgreSQL client
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends postgresql-client \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Set up workspace directory
WORKDIR /workspace
