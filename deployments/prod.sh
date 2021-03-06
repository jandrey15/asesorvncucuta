wget -O /tmp/packer.zip https://releases.hashicorp.com/packer/1.3.2/packer_1.3.2_linux_amd64.zip
wget -O /tmp/terraform.zip https://releases.hashicorp.com/terraform/0.11.10/terraform_0.11.10_linux_amd64.zip

sudo unzip -o /tmp/packer.zip -d /usr/local/bin/
sudo unzip -o /tmp/terraform.zip -d /usr/local/bin/

packer validate deployments/template.json && 
packer build deployments/template.json &&

export TF_VAR_image_id=$(curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer $DIGITALOCEAN_API_TOKEN" "https://api.digitalocean.com/v2/images?private=true" | jq ."images[] | select(.name == \"asesorvncucuta-base-$TRAVIS_BUILD_NUMBER\") | .id") &&

echo "Got the image id of the new digital ocean image" &&
echo $TF_VAR_image_id &&

cd infra &&
terraform init -input=false && 
terraform apply -input=false -auto-approve &&

echo "Deployed and saved!" &&
echo "Now deleting the image previously created" &&

curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer $DIGITALOCEAN_API_TOKEN" "https://api.digitalocean.com/v2/images/$TF_VAR_image_id" &&
echo "Image deleted successfuly"
