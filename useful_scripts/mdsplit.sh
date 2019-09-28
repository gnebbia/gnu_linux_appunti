sed -i '/^## .*\// s/\// /g' $1     # convert '/' to a single space
sed -i '/^## / s/\\/ /g' $1         # convert '\' to a single space
sed -i "/^## / s/'/ /g" $1          # convert '\' to a single space
sed -i "/^## / s/,/ /g" $1          # convert ',' to a single space
sed -i '/^## / s/ \+/ /g' $1        # flatten more spaces into one
sed -i 's/ \+$//g' $1               # remove trailing end spaces
sed -i '/^## / s/[()]//g' $1        # remove round parenthesis 
sed -i '/^## / s/\-/ /g' $1         # convert '-' to a single space
sed -i '/^## / s/ /_/g' $1          # convert all spaces to '_'
sed -i '/^##_/ s/_/ /' $1           # convert first '_' to space
sed -i '/^## / s/\(.*\)/\L\1/' $1   # convert to lowercase
awk '{if(gsub(/^##\s+/,"")){name=$0;}else{print > name".x.md"}}' $1
sed -i -e 's/^### /## /g' -e 's/^#### /### /g' -e 's/^##### /#### /g' -e 's/^###### /#####/g' *.md
