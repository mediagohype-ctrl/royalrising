from pathlib import Path
import json,urllib.request,concurrent.futures
rows=json.loads(Path('.tmp/drive-images.json').read_text())
Path('.tmp/drive-previews').mkdir(exist_ok=True)
def get(r):
 try:
  urllib.request.urlretrieve('https://drive.google.com/thumbnail?id='+r['id']+'&sz=w400', '.tmp/drive-previews/'+str(r['index'])+'.jpg')
  return str(r['index'])+' OK'
 except Exception as e:return str(r['index'])+' '+str(e)
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
 for result in pool.map(get,rows):print(result,flush=True)
