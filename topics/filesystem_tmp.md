
The cleaning of /tmp is done by the upstart script
/etc/init/mounted-tmp.conf. The script is run by upstart
everytime /tmp is mounted. Practically that means at every boot.
The script does roughly the following: if a file in /tmp is older
than $TMPTIME days it will be deleted. The default value of
$TMPTIME is 0, which means every file and directory in /tmp gets
deleted. $TMPTIME is an environment variable defined in
/etc/default/rcS.

Notice that we can create temporary files with mktemp, for
example:

```sh
my_tmp_file=$(mktemp)
```
and write to it with:

```sh
echo "ciaooo" > "$my_tmp_file"
```
remove it with:

```sh
rm "$my_tmp_file"
```
we can even create a temporary directory:

```sh
my_tmp_dir=$(mktemp -d)
```

