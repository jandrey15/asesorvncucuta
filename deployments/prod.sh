wget -O /tmp/packer.zip https://releases.hashicorp.com/packer/1.3.2/packer_1.3.2_linux_amd64.zip
wget -O /tmp/terraform.zip https://releases.hashicorp.com/terraform/0.11.10/terraform_0.11.10_linux_amd64.zip

sudo unzip -o /tmp/packer.zip -d /usr/local/bin/
sudo unzip -o /tmp/terraform.zip -d /usr/local/bin/

packer validate deployments/template.json && 
# packer build deployments/template.json &&

export TF_VAR_image_id=$(curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer $DIGITALOCEAN_API_TOKEN" "https://api.digitalocean.com/v2/images?private=true" | jq ."images[] | select(.name == \"asesorvncucuta-base-$TRAVIS_BUILD_NUMBER\") | .id") &&

echo "Got the image id of the new digital ocean image" &&
echo $TF_VAR_image_id &&

cd infra &&
# terraform init -input=false && 
# terraform apply -input=false -auto-approve && cd .. &&
git config --global user.email "build@travis-ci.com" &&
git config --global user.name "Travis CI" &&
# git add infra && git commit -m "Deployed $TRAVIS_BUILD_NUMBER [skip ci]"
touch test.txt &&
git add test.txt && git commit -m "Deployed $TRAVIS_BUILD_NUMBER [skip ci]"


upload_files() {
  # git remote rm origin &&
  # Add new "origin" with access token in the git URL for authentication
  # git remote add origin https://jandrey15:${GH_TOKEN}@github.com/jandrey15/asesorvncucuta.git > /dev/null 2>&1

  git status
  # git push origin master --quiet
  # git push origin master > /dev/null 2>&1
  git push origin master
  echo "push a master"
}

# Attempt to commit to git only if "git commit" succeeded
if [ $? -eq 0 ]; then
  echo "A new commit with changed country JSON files exists. Uploading to GitHub"
  upload_files
else
  echo "No changes in country JSON files. Nothing to do"
fi

# git push origin master &&
echo "Deployed and saved!"
# echo "Deployed and saved!" &&
# echo "Now deleting the image previously created" &&

# curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer $DIGITALOCEAN_API_TOKEN" "https://api.digitalocean.com/v2/images/$TF_VAR_image_id" &&
# echo "Image deleted successfuly" &&
# echo "Done!"
