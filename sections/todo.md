
* cgroups
* lxc
* network namespace
* xen
* active directory
* dpms
* xrandr
* xsetroot or hsetroot
* power management (section)
* Xclip
* cross compiling
* xev
* xdotool
* xset, with this we can control leds on computers/laptops or
* even mouse speed, the keyboard repeat delay and rate and if the
* repeat is enabled or not
* tunctl
* bridge ethernet
* xmodmap to remap the keys
* acpid
* ulimit: Commands and resources ulimit -n
* view number of
* processes change /etc/security/limits.conf or
* /etc/security/limits.d/90-xxxxx.conf, ulimit -a views the list
* of all the limits on the machine
* audio (utile pavucontrol)
* sysctl (used mostly on bsd systems, even for laptop features
* such as lid closing/opening events)
* strace, ftrace, ltrace, stap, perf, sysdig
* bash scripting
* tun/tap
* setterm
* to manage screen blanking in pure terminal
* environments
* gcore
* fc
* check the content of the program in memory
* apt-pinning
* yes, comando per eseguire atuomaticamente aggiornamenti di sistema e similari
* dget and backporting packages in debian
* come aprire un file di man tipo "pagina.1" con man
* MULTIMEDIA: Convert (Swiss Army Knife for Images) and Sox
* (Swiss Army Knife for Audio)
* imagemagick, convert or compare:
* compare image1.jpg image2.jpg #gives us the difference
    between images

* rename files
```sh
# Full rename of filenames, directories, and contents foo -> bar:
repren --full --preserve-case --from foo --to bar .
# Recover backup files whatever.bak -> whatever:
repren --renames --from '(.*)\.bak' --to '\1' *.bak
# Same as above, using rename, if available:
rename 's/\.bak$//' *.bak
# be careful with rename, its function changes from distribution
# to distribution
```
or
```sh
# Renames all the *.md files in *.txt files
rename .md .txt *.md
```

* nginx configuration e.g., this is useful:

nginx to act as a deployment proxy for random wsgi or other web server:
```nginx
server {
  listen 80;
  server_name example.org;
  access_log  /var/log/nginx/example.log;

  location / {
      proxy_pass http://127.0.0.1:8000;
      proxy_set_header Host $host;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

