const fs = require('fs');
const sharp = require('sharp');
(async () => {
 const selected=JSON.parse(fs.readFileSync('.tmp/drive-selected.json','utf8'));
 fs.mkdirSync('public/images/projects',{recursive:true});
 const credits=[];
 for (const item of selected) {
  const target='public/images/projects/'+item.key+'.webp';
  const info=await sharp(item.original).rotate().resize({width:2000,height:2000,fit:'inside',withoutEnlargement:true}).webp({quality:88}).toFile(target);
  credits.push({...item,original:undefined,src:'/images/projects/'+item.key+'.webp',width:info.width,height:info.height,source:'https://drive.google.com/file/d/'+item.driveId+'/view'});
  console.log(item.key,info.width+'x'+info.height,Math.round(info.size/1024)+' KB');
 }
 fs.writeFileSync('public/images/projects/sources.json',JSON.stringify({folder:'https://drive.google.com/drive/folders/1Xi9sw-NFkWtP-4FfcVRBEpOU8rXIuH1N',images:credits},null,2)+'\n');
 const imports=selected.map((x,i)=>'import photo'+i+' from "../../public/images/projects/'+x.key+'.webp";').join('\n');
 const map=selected.map((x,i)=>'  "project-'+x.key+'": photo'+i+',').join('\n');
 fs.writeFileSync('src/lib/project-images.ts',imports+'\n\n// Direct imports keep dimensions and file references checked by Next.js.\nexport const projectImages = {\n'+map+'\n};\n');
})();
