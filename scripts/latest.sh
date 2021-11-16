#!/bin/bash

arr=()
IFS=$'\n' read -r -d '' -a arr < <( curl -s "https://api.github.com/repos/genshinsim/gcsimui/releases/latest" | jq -r '.assets[] | .browser_download_url' && printf '\0' )

version=$(awk -F'"' '/"version": ".+"/{ print $4; exit; }' package.json)
echo "Latest version $version"
darwin=""
win64=""
linux=""

for i in "${arr[@]}"
do
#    echo "$i"
   # or do whatever with individual element of the array
   [[ $i =~ _x64.msi.zip$ ]] && win64=$i && echo "Windows build found: $win64"
   [[ $i =~ app.tar.gz$ ]] && darwin=$i && echo "Darwin build found: $darwin"
   [[ $i =~ AppImage.tar.gz$ ]] && linux=$i && echo "Linux build found: $linux"
done


cat << EOF > latest.json
{
    "name":"v$version",
    "notes":"See release notes at https://github.com/genshinsim/gcsimui/releases",
    "platforms": {
        "darwin": {
            "signature":"",
            "url":"$darwin"
        },
        "linux": {
            "signature":"",
            "url":"$linux"
        },
        "win64": {
            "signature":"",
            "url":"$win64"
        }
    }
}
EOF