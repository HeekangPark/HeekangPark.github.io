from fontTools.ttLib import TTFont
import argparse
import os

parser = argparse.ArgumentParser(description="Convert Font Formats")
parser.add_argument("--src", required=True, type=str, help="font file to convert")
parser.add_argument("--output-format", default="woff2", type=str, choices=["woff2"], help="output format")

args = parser.parse_args()

file_name = os.path.splitext(args.src)[0]

f = TTFont(args.src)
f.flavor = args.output_format
f.save(file_name + "." + args.output_format)