#!/usr/bin/env sh

if [ -z "$1" ]; then
  echo "Usage: $0 <image-name>" >&2
  exit 1
fi

SVGPATH="./static/drawings/svg/$1.svg"

if [ ! -f $SVGPATH ]; then
  echo "NOT FOUND: $SVGPATH" >&2
  exit 1
fi

JJCHANGEID="$(jj log --color=never -r @- -G -T 'self.change_id().short()')"
JJDESCRIPTION=$(jj log --color=never -r @- -G -T 'self.description()')
echo $JJCHANGEID
echo $JJDESCRIPTION

OUTPATH="/home/doppler/Pictures/$1-$JJCHANGEID.png"

magick $SVGPATH -set exif:ImageDescription "jj_change_id: $JJCHANGEID jj_description: $JJDESCRIPTION" $OUTPATH
 
