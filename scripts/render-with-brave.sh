#!/usr/bin/env sh
# 
if [ -z "$1" ]; then
  echo "Usage: $0 <image-name>" >&2
  exit 1
fi

SVGPATH="$PWD/static/drawings/svg/$1.svg"

if [ ! -f $SVGPATH ]; then
  echo "NOT FOUND: $SVGPATH" >&2
  exit 1
fi

if [ -n "$2" ]; then
  REV="$2"
else
  REV="@-"
fi

JJCHANGEID="$(jj log --color=never -r $REV -G -T 'self.change_id().short()')"
JJDESCRIPTION=$(jj log --color=never -r $REV -G -T 'self.description()')
echo $JJCHANGEID
echo $JJDESCRIPTION

OUTPUT_DIR="/home/doppler/Pictures/$1"

if [ ! -d $OUTPUT_DIR ]; then
  echo "Creating $OUTPUT_DIR"
  mkdir -p $OUTPUT_DIR
fi

COUNT="$(ls $OUTPUT_DIR | wc -l)"

SVGHEAD=$(head $SVGPATH)
WIDTH=$(echo $SVGHEAD | grep -oP 'data-image-width="\K[0-9]+')
HEIGHT=$(echo $SVGHEAD | grep -oP 'data-image-height="\K[0-9]+')


OUTPATH="$OUTPUT_DIR/$1-$COUNT-$JJCHANGEID.webp"

COMMAND="brave --headless --window-size=$WIDTH,$HEIGHT --screenshot=$OUTPATH file://$SVGPATH"

echo $COMMAND

RESULT=$($COMMAND)

echo $RESULT

