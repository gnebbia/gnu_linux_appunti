#! /usr/bin/env perl
#
# Short description for parser.pl
#
# Author giuseppe <giuseppe@linux-029m>
# Version 0.1
# Copyright (C) 2018 giuseppe <giuseppe@linux-029m>
# Modified On 2018-07-27 11:58
# Created  2018-07-27 11:58
#
use strict;
use warnings;


use Modern::Perl;

use File::Slurp;


my $text = read_file("README.md");



$text =~ s/^  -- /* /gsm;

print $text;

