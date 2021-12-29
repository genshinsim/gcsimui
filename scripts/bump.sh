#!/bin/bash
function bump() {
  echo -n "Updating $1..."
  tmp_file=$(mktemp)
  rm -f "$tmp_file"
  sed -i.bak "s/$2/$3/1w $tmp_file" $1
  if [ -s "$tmp_file" ]; then
    echo "Done"
  else
    echo "Nothing to change"
  fi
  rm -f "$tmp_file"
}

if [ "$1" == "major" ] || [ "$1" == "minor" ] || [ "$1" == "patch" ]; then
  current_version=$(awk -F\" '/"version":/ {print $4}' package.json)

  IFS='.' read -a version_parts <<<"$current_version"

  major=${version_parts[0]}
  minor=${version_parts[1]}
  patch=${version_parts[2]}

  case "$1" in
  "major")
    major=$((major + 1))
    minor=0
    patch=0
    ;;
  "minor")
    minor=$((minor + 1))
    patch=0
    ;;
  "patch")
    patch=$((patch + 1))
    ;;
  esac
  new_version="$major.$minor.$patch"
  echo "Current version is ${current_version}"
  echo "New version is ${new_version}"
fi

echo "\"version\": \"$current_version\"" 

bump package.json "\"version\": \"$current_version\"" "\"version\": \"$new_version\""
bump "src-tauri/Cargo.toml" "version = \"$current_version\"" "version = \"$new_version\""
bump "src-tauri/tauri.conf.json" "\"version\": \"$current_version\"" "\"version\": \"$new_version\""
bump "src-tauri/tauri.conf.json" "\"title\": \"gcsim v$current_version\"" "\"title\": \"gcsim v$new_version\""

rm -f package.json.bak
rm -f src-tauri/Cargo.toml.bak
rm -f src-tauri/tauri.conf.json.bak