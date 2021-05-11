from git import Repo
import os
from datetime import datetime

repo_dir = "./"
repo = Repo(repo_dir)

modified_files = [x.a_path for x in repo.index.diff("HEAD")] + [x.a_path for x in repo.index.diff(None)] + repo.untracked_files

today = datetime.today()

updated_files = []
for file in modified_files:
    file = os.path.join(repo_dir, file)
    if os.path.exists(file) and file.endswith(".md"):
        with open(file, "r") as f:
            lines = f.readlines()
            
        if len(lines) == 0:
            print(f"Has no lines : {file}")
            continue
        
        if lines[0].strip() != "---":
            continue
        meta = dict()
        for i, line in enumerate(lines[1:]):
            if line.strip() == "---":
                meta_end_idx = i + 1
                break
            else:
                key = line.split(":")[0].strip()
                value = ":".join(line.split(":")[1:]).strip()
                
                meta[key] = value
        
        meta["date_modified"] = today.strftime("\"%Y-%m-%d\"")
        updated_files.append(file)
        
        with open(file, "w") as f:
            f.write("".join(["---\n"] + [f"{key}: {meta[key]}\n" for key in meta.keys()] + ["---\n"] + lines[meta_end_idx + 1:]))

if len(updated_files) > 0:
    print("\033[32mDate Modified successfully updated.\033[0m")
    for file in updated_files:
        print(f"    \033[36m{file}\033[0m")
else:
    print("\033[33mNothing has been modified.\033[0m")

print()