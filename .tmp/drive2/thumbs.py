"""Download small Drive previews (not originals) so duplicates can be found before any full download."""
from pathlib import Path
import json, urllib.request, concurrent.futures

root = Path(__file__).parent
jobs = []
for r in json.loads((root / "new-list.json").read_text()):
    if not r["name"].lower().endswith(".mov"):
        jobs.append(("n", r))
known = {r["id"] for r in json.loads((root.parent / "drive-images.json").read_text())}
for r in json.loads((root / "old-list.json").read_text()):
    if r["id"] not in known:
        jobs.append(("o", r))
out = root / "thumbs"
out.mkdir(exist_ok=True)

def get(job):
    tag, r = job
    path = out / f"{tag}{r['index']}.jpg"
    if path.exists():
        return "skip"
    urllib.request.urlretrieve(f"https://drive.google.com/thumbnail?id={r['id']}&sz=w400", path)
    return "ok"

with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    results = list(pool.map(get, jobs))
print(len(jobs), "previews", results.count("ok"), "downloaded")
