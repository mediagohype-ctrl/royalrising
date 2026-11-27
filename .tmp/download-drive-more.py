"""Download the additional Drive photos (round 2) into .tmp/drive-originals."""
from pathlib import Path
import json, urllib.request, concurrent.futures

root = Path(__file__).parent
rows = json.loads((root / "drive-images.json").read_text())
selected = {
    0: "walkin-wardrobe", 1: "wardrobe-detail", 2: "white-bedroom-tv", 3: "white-bedroom",
    4: "statue-living", 5: "tufted-living", 6: "tufted-living-view", 10: "cinema-screen",
    11: "suite-study", 13: "suite-lounge", 15: "suite-overview", 20: "lounge-sofa",
    21: "lounge-overhead", 23: "fireplace-lounge", 25: "staircase-view", 27: "display-partition",
    33: "bar-lounge-red", 39: "bath-vanity", 40: "geometric-bedroom", 43: "living-room-wide",
    44: "living-dining", 45: "dining-screen", 46: "dining-partition", 47: "copper-bedroom",
    48: "bedroom-study",
}
out = root / "drive-originals"
out.mkdir(exist_ok=True)

def get(pair):
    n, key = pair
    r = rows[n]
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
(root / "drive-selected-more.json").write_text(json.dumps(results, indent=2))
print("Downloaded", len(results))
