mkdir -p ~/minio/data

docker run \
 -p 9000:9000 \
 -p 9090:9090 \
 -d \
 --name minio \
 -v ~/minio/data:/data \
 -e "MINIO_ROOT_USER=admin" \
 -e "MINIO_ROOT_PASSWORD=beva@2023" \
 quay.io/minio/minio server /data --console-address ":9090"
