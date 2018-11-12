npm install -g now
pwd
echo "deploying..."

now secrets add listid $LISTID -t $now_token
now secrets add api_key $API_KEY -t $now_token
now secrets add secret_captcha $SECRET_CAPTCHA -t $now_token

URL=$(now -t $now_token)
echo "running acceptance on $URL"
curl --silent -L $URL
now alias