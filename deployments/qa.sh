npm install -g now
echo '--------------------------------'
cd web
echo "deploying..."
# Error! The secret name "listid" already exists for this user
# now secrets add listid $LISTID -t $now_token
# now secrets add api_key $API_KEY -t $now_token
# now secrets add secret_captcha $SECRET_CAPTCHA -t $now_token
#Tener en cuenta que una ves se agg el secret queda en el user

URL=$(now -t $now_token)
echo "running acceptance on $URL"
curl --silent -L $URL
now alias -t $now_token