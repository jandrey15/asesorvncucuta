setup_git() {
  git config --global user.email "build@travis-ci.com" &&
  git config --global user.name "Travis CI"
}

commit_country_json_files() {
  git checkout master &&
  git status &&
  git add infra/test.txt && git commit -m "Deployed $TRAVIS_BUILD_NUMBER [skip ci]"
  # git add infra && git commit -m "Deployed $TRAVIS_BUILD_NUMBER [skip ci]"
}

upload_files() {
  git remote rm origin &&
  git remote add origin https://jandrey15:${GH_TOKEN}@github.com/jandrey15/asesorvncucuta.git > /dev/null 2>&1
  git push origin master --quiet > /dev/null 2>&1
}

# git add test.txt && git commit -m "Deployed $TRAVIS_BUILD_NUMBER [skip ci]"


# upload_files() {
#   # git remote rm origin
#   # # Add new "origin" with access token in the git URL for authentication
#   # git remote add origin https://jandrey15:${GH_TOKEN}@github.com/jandrey15/asesorvncucuta.git > /dev/null 2>&1
#   git remote add deploy https://jandrey15:${GH_TOKEN}@github.com/jandrey15/asesorvncucuta.git > /dev/null 2>&1
#   git push deploy master --quiet > /dev/null 2>&1
#   # git push origin master --quiet > /dev/null 2>&1
#   # git push origin master
#   echo "push a master"
# }

setup_git

commit_country_json_files

if [ $? -eq 0 ]; then
  echo "A new commit with changed country JSON files exists. Uploading to GitHub"
  upload_files
else
  echo "No changes in country JSON files. Nothing to do"
fi