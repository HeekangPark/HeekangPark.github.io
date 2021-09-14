import sys

sw_path = "service-worker.js"

with open(sw_path, "r") as f:
    lines = f.readlines()

with open(sw_path, "w") as f:
    lines[0] = f'const COMMIT_TIME = "{sys.argv[1]}";\n'
    f.write(''.join(lines))