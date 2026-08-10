#!/bin/bash
# VelixMEDIA - Automatic SQLite & JSON DB Backup to AWS S3 Script

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
DATA_DIR="$SCRIPT_DIR/data"
DB_FILE="$DATA_DIR/velix.db"
JSON_FILE="$DATA_DIR/velix_store.json"

# Extract S3 bucket name from .env.production or .env
BUCKET_NAME=$(grep AWS_S3_BUCKET_NAME .env.production 2>/dev/null | cut -d '=' -f2 | tr -d '"\r ')
if [ -z "$BUCKET_NAME" ]; then
  BUCKET_NAME=$(grep AWS_S3_BUCKET_NAME .env 2>/dev/null | cut -d '=' -f2 | tr -d '"\r ')
fi

if [ -z "$BUCKET_NAME" ]; then
  echo "[!] S3 Bucket Name not found in .env.production or .env"
  exit 1
fi

echo "[+] Starting S3 DB Backup to s3://$BUCKET_NAME/backups/..."

if [ -f "$DB_FILE" ]; then
  aws s3 cp "$DB_FILE" "s3://$BUCKET_NAME/backups/velix_$TIMESTAMP.db"
  echo "[✓] Backed up velix.db -> s3://$BUCKET_NAME/backups/velix_$TIMESTAMP.db"
fi

if [ -f "$JSON_FILE" ]; then
  aws s3 cp "$JSON_FILE" "s3://$BUCKET_NAME/backups/velix_store_$TIMESTAMP.json"
  echo "[✓] Backed up velix_store.json -> s3://$BUCKET_NAME/backups/velix_store_$TIMESTAMP.json"
fi

echo "[✓] DB Backup to S3 completed successfully."
