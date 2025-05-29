FROM node

WORKDIR /app

# Download Typesense binary
RUN curl -O https://dl.typesense.org/releases/28.0/typesense-server-28.0-linux-arm64.tar.gz && \
    tar -xzf typesense-server-28.0-linux-arm64.tar.gz

ENTRYPOINT ["/app/typesense-server"]