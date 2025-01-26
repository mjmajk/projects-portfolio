#bin/bash

echo "Building web image"
docker build . -t projects-portfolio-web -f ./apps/public-web/Dockerfile --network=host
echo "Tagging image"
docker tag projects-portfolio-web:latest mjmajk/project-portfolio-web:latest
echo "Pushing image"
docker push mjmajk/project-portfolio-web:latest
echo "Done"

