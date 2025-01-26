#bin/bash

echo "Building api image"
docker build . -t projects-portfolio-api -f ./apps/api/Dockerfile --network=host
echo "Tagging image"
docker tag projects-portfolio-api:latest mjmajk/projects-portfolio-api
echo "Pushing image"
docker push mjmajk/projects-portfolio-api
echo "Done"

