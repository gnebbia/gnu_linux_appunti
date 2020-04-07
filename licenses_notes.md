## GPL 

GPL, also known as copyleft, grants permission to reuse or modify the
source code to make derivative works, but if you distribute your program
to others, it requires you to license your derivative work under the GPL
too. E.g. you have to make the source code available to your users and
allow further modification and redistribution. People in the business
of making proprietary software (take Microsoft, please) are horrified
at the thought that, say, Windows got entangled with the GPL so they'd
be forced to release their source code.

## LGPL 

LGPL is for library routines. If someone modifies your LGPL library
code, the LGPL behaves pretty much like the GPL, but if someone writes
software that merely uses your library, the LGPL doesn't impose source
release on the program that calls upon your code. This can broaden the
potential uses of a library.

## AGPL

AGPL is like the GPL, but the GPL is only triggered if you distribute
your derivative work. AGPL broadens this to trigger to activate if you
let people use your derivative work over a network.
The GNU Affero General Public License is a modified version of the
ordinary GNU GPL version 3. It has one added requirement: if you run a
modified program on a server and let other users communicate with it
there, your server must also allow them to download the source code
corresponding to the modified version running there.
The purpose of the GNU Affero GPL is to prevent a problem that affects
developers of free programs that are often used on servers.
Suppose you develop and release a free program under the ordinary
GNU GPL. If developer D modifies the program and releases it, the GPL
requires him to distribute his version under the GPL too. Thus, if you
get a copy of his version, you are free to incorporate some or all of
his changes into your own version.
But suppose the program is mainly useful on servers. When D modifies
the program, he might very likely run it on his own server and never
release copies. Then you would never get a copy of the source code of
his version, so you would never have the chance to include his changes
in your version. You may not like that outcome.

Using the GNU Affero GPL avoids that outcome. If D runs his version
on a server that everyone can use, you too can use it. Assuming he has
followed the license requirement to let the server's users download the
source code of his version, you can do so, and then you can incorporate
his changes into your version. (If he hasn't followed it, you have your
lawyer complain to him.)

Both the ordinary GNU GPL, version 3, and the GNU Affero GPL have text
allowing you to link together modules under these two licenses in one
program.

## BSD

A BSD license allows creation of derivative works, but you could
declare your version of the software to be proprietary. E.g. gcc is GPL
licensed. You are free to use it's source code to make a better compiler,
but when you redistribute your improved compiler, you are obligated to
make the improved source code available. If, say, Microsoft liked your
version, they could base a version on your code, but the GPL would stick,
so Microsoft's version would also be licensed under the GPL. No room
for secret undocumented backdoors for the NSA.

Clang (based on LLVM) is BSD licensed. As with gcc you can modify the
source if you'd like to improve the compiler. If Microsoft likes your
version, they can use it and aren't even obligated to send you a thankyou
note. They can make a version of their own based on your work and keep
their version proprietary. If they integrate backdoors for the NSA,
well, good luck trying to find them when you don't have access to their
source code.
