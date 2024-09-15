#!/bin/bash

# Ensure the script exits on any command failure
set -e

# Export environment variables
export MINIO_ALIAS="${MINIO_ALIAS}"
export MINIO_ACCESS_KEY="${MINIO_ACCESS_KEY}"
export MINIO_SECRET_KEY=$(cat "${MINIO_SECRET_KEY_FILE}")

# echo "MINIO_ACCESS_KEY: ${MINIO_ACCESS_KEY}"
# echo "MINIO_SECRET_KEY: ${MINIO_SECRET_KEY}"

# Configure MinIO client (mc)
echo "Configuring MinIO client..."
mc alias set "${MINIO_ALIAS}" http://minio:9000 "${MINIO_ACCESS_KEY}" "${MINIO_SECRET_KEY}"

echo "MinIO setup completed successfully."


