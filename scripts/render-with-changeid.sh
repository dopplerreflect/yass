#!/usr/bin/env sh
# 
if [ -z "$1" ]; then
  echo "Usage: $0 <image-name>" >&2
  exit 1
fi

SVGPATH="./static/drawings/svg/$1.svg"

if [ ! -f $SVGPATH ]; then
  echo "NOT FOUND: $SVGPATH" >&2
  exit 1
fi

OUTPUT_DIR="/home/doppler/Pictures/$1"

if [ ! -d $OUTPUT_DIR ]; then
  echo "Creating $OUTPUT_DIR"
  mkdir -p $OUTPUT_DIR
fi

COUNT="$(ls $OUTPUT_DIR | wc -l)"

if [ -n "$2" ]; then
  REV="$2"
else
  REV="@-"
fi

JJCHANGEID="$(jj log --color=never -r $REV -G -T 'self.change_id().short()')"
JJDESCRIPTION=$(jj log --color=never -r $REV -G -T 'self.description()')
echo $JJCHANGEID
echo $JJDESCRIPTION

OUTPATH="$OUTPUT_DIR/$1-$COUNT-$JJCHANGEID.png"

echo "Will write $OUTPATH"

magick $SVGPATH -set exif:ImageDescription "jj_change_id: $JJCHANGEID jj_description: $JJDESCRIPTION" $OUTPATH
 
