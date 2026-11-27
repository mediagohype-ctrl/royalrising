"""Download ONLY the 29 de-duplicated photos (round 3) into .tmp/drive-originals.
Duplicates were found by visual fingerprint (dedupe.cjs) and by eye, and are not downloaded."""
from pathlib import Path
import json, urllib.request, concurrent.futures

root = Path(__file__).parent
lists = {"n": {r["index"]: r for r in json.loads((root / "new-list.json").read_text())},
         "o": {r["index"]: r for r in json.loads((root / "old-list.json").read_text())}}
selected = {
    "n18": "pendant-bedroom", "n22": "white-bedroom-wardrobe", "n23": "quilted-bedroom",
    "n155": "quilted-bedroom-wardrobe", "n32": "foyer-sculpture", "n37": "marble-living-tv",
    "n41": "marble-living-dining", "n50": "marble-foyer-console", "n54": "pooja-room",
    "n56": "grey-gold-bedroom", "n59": "grey-gold-headboard", "n62": "timber-tv-wall",
    "n65": "grey-gold-tv-wall", "n68": "grey-gold-bedroom-view", "n71": "black-marble-bedroom",
    "n80": "black-marble-bedroom-tv", "n83": "teal-bedroom", "n89": "console-foyer",
    "n91": "blush-bedroom", "n99": "timber-bedroom", "n105": "jaali-bedroom",
    "n107": "sage-bedroom", "n124": "pattern-bedroom", "n140": "panel-bedroom",
    "n163": "bronze-living", "o50": "study-bedroom", "o52": "marble-bath",
    "o53": "marble-bath-vanity", "o55": "blush-marble-bedroom",
}
out = root.parent / "drive-originals"

def get(pair):
    ref, key = pair
    r = lists[ref[0]][int(ref[1:])]
    path = out / (key + Path(r["name"]).suffix.lower())
    with urllib.request.urlopen("https://drive.google.com/uc?export=download&id=" + r["id"], timeout=120) as res:
        kind = res.headers.get("Content-Type", "")
        data = res.read()
    if not kind.startswith("image/"):
        raise RuntimeError(f"{key}: got {kind}, not an image")
    path.write_bytes(data)
    return {"key": key, "original": str(path), "driveId": r["id"], "sourceName": r["name"]}

with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    results = list(pool.map(get, selected.items()))
(root.parent / "drive-selected-more.json").write_text(json.dumps(results, indent=2))
print("Downloaded", len(results))
