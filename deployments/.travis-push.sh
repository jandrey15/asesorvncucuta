setup_git() {
  git config --global user.email "build@travis-ci.com" &&
  git config --global user.name "traviscibot"
  # git config --global user.name "Travis CI"
}

commit_country_json_files() {
  git checkout master &&
  git status &&
  git add infra && git commit -m "Deployed $TRAVIS_BUILD_NUMBER [skip ci]"
}

upload_files() {
  git remote rm origin &&
  git remote add origin https://jandrey15:${GH_TOKEN}@github.com/jandrey15/asesorvncucuta.git > /dev/null 2>&1
  git push origin master --quiet > /dev/null 2>&1
}

setup_git

commit_country_json_files

if [ $? -eq 0 ]; then
  upload_files
  echo "push a master"
else
  echo "No changes in country JSON files. Nothing to do"
fi