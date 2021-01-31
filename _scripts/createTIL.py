from datetime import datetime
from pytz import timezone
import os

TIL_dir = "documents/_til"
format = "%Y-%m-%d"
today = datetime.now(timezone("Asia/Seoul")).strftime(format)

with open(os.path.join(TIL_dir, f"{today}.md"), "w") as f:
    f.write("---\n")
    f.write(f"title: \"{today}\"\n")
    f.write(f"date: \"{today}\"\n")
    f.write("---\n")

print(f"\033[32m{os.path.join(TIL_dir, f'{today}.md')} successfully created.\033[0m")