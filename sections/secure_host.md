

* hardening (add stuff)
* Move Capabilities here?
* finger


# User nobody

It's there to run things that don't need any special permissions. It's
usually reserved for vulnerable services (httpd, etc) so that if they
get hacked, they'll have minimal damage on the rest of the system.

Contrast this with running something as a real user, if that service
were compromised (web servers are occasionally exploited to run arbitrary
code), it would run as that user and have access to everything that user
had. In most cases, this is as bad as getting root.

Can you give a particular example when is indicated to use this account?
When permissions aren't required for a program's operations. This is
most notable when there isn't ever going to be any disk activity.

A real world example of this is memcached (a key-value in-memory
cache/database/thing), sitting on my computer and my server running under
the nobody account. Why? Because it just doesn't need any permissions
and to give it an account that did have write access to files would just
be a needless risk.
