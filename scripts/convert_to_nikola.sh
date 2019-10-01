# example usage
# ./convert_to_nikola.sh ~/Notes/hping/ # ~/Public/pelabinfosec.ml/nebbia/pages/notes/hping

cat << EOF > /tmp/slug
<!--
.. title: ${2##*/}
.. slug: index
.. date: 2018-07-06 14:20:00 UTC+02:00
.. tags:
.. category:
.. link:
.. description:
.. type: text
-->


EOF




mv $2 /tmp/
mkdir $2
cd $1
cp README.md i.md
sed -i 's/.md)/)/g' i.md
cat /tmp/slug i.md > index.md
rm i.md /tmp/slug
mv index.md $2
cp -r sections/ $2

