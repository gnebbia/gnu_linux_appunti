mkdir sections/
cp $1 $1.bak
mv $1 README
sed -i '/^## .*\// s/\// /g' $1.bak     # convert '/' to a single space
sed -i '/^## / s/\\/ /g' $1.bak         # convert '\' to a single space
sed -i "/^## / s/'/ /g" $1.bak          # convert '\' to a single space
sed -i "/^## / s/,/ /g" $1.bak          # convert ',' to a single space
sed -i '/^## / s/ \+/ /g' $1.bak        # flatten more spaces into one
sed -i 's/ \+$//g' $1.bak               # remove trailing end spaces
sed -i '/^## / s/://g' $1.bak           # remove colons
sed -i '/^## / s/;//g' $1.bak           # remove semicolons
sed -i '/^## / s/[()]//g' $1.bak        # remove round parenthesis 
sed -i '/^## / s/\-/ /g' $1.bak         # convert '-' to a single space
sed -i '/^## / s/ /_/g' $1.bak          # convert all spaces to '_'
sed -i '/^##_/ s/_/ /' $1.bak           # convert first '_' to space
sed -i '/^## / s/\(.*\)/\L\1/' $1.bak   # convert to lowercase
awk '{if(gsub(/^##\s+/,"")){name=$0;}else{print > "sections/"name".md"}}' $1.bak
sed -i -e 's/^### /## /g' -e 's/^#### /### /g' -e 's/^##### /#### /g' -e 's/^###### /#####/g' sections/*.md
grep -i '^## ' README.md.bak > index.md
mv README $1
rm $1.bak
