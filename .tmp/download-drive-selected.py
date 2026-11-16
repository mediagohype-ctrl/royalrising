from pathlib import Path
import json,urllib.request,concurrent.futures
rows=json.loads(Path('.tmp/drive-images.json').read_text())
selected={7:'bar-detail',9:'home-cinema',12:'bedroom-suite',16:'residence-facade',17:'timber-facade',18:'green-lounge',28:'entry-detail',30:'staircase-dining',38:'dressing-suite',41:'formal-living',42:'dining-room',49:'bedroom-detail'}
Path('.tmp/drive-originals').mkdir(exist_ok=True)
def get(pair):
 n,name=pair;r=rows[n];p='.tmp/drive-originals/'+name+Path(r['name']).suffix
 urllib.request.urlretrieve('https://drive.google.com/uc?export=download&id='+r['id'],p)
 return {'key':name,'original':p,'driveId':r['id'],'sourceName':r['name']}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
 results=list(pool.map(get,selected.items()))
Path('.tmp/drive-selected.json').write_text(json.dumps(results,indent=2));print('Downloaded',len(results),'original files')
