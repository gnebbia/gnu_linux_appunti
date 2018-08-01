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
use String::Util 'trim';
use File::Slurp;


my $inbraces=0;
my @newlines;

while (<<>>) {
    my $curr_line = $_;
    if ($_ =~ /```sh/){
        $inbraces=1;
        push @newlines, $_;
    } 
    elsif ($_ =~/```/){
        $inbraces=0;
        push @newlines, $_;
    }
    elsif ($inbraces){
        if ($curr_line =~ /^(.*)#(.*)/){
            push @newlines, "$1\n";
            my $second_piece = trim($2);
            push @newlines, " # $2\n";
        } else {
            $curr_line =~ s/^\s+//;
            push @newlines, " # $curr_line";
        }
    }
    else {
        push @newlines, $_;
    }
}



print foreach (@newlines);




