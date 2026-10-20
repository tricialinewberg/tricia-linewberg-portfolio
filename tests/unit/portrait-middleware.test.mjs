import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, writeFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createServer} from 'node:http';
import config from '../../vite.config.mjs';

function middleware(directory, base='/') {
 let handler;
 config.plugins[0].configureServer({config:{publicDir:directory,base},middlewares:{use(value){handler=value;}}});
 return handler;
}

test('portrait middleware safely delegates malformed or unrelated requests',()=>{
 const handle=middleware('/unused');
 for(const request of [{method:'GET',url:'http://['},{method:'POST',url:'/images/%232a1a30%20(8).png'},{method:'GET',url:'/other.png'}]){
  let delegated=0;assert.doesNotThrow(()=>handle(request,{},()=>delegated++));assert.equal(delegated,1);
 }
});

test('original encoded portrait supports root/base GET and HEAD without byte changes',async()=>{
 const directory=await mkdtemp(join(tmpdir(),'portfolio-portrait-'));
 const bytes=Buffer.from([137,80,78,71,13,10,26,10,0,1,2,3]);
 await mkdir(join(directory,'images'));await writeFile(join(directory,'images','#2a1a30 (8).png'),bytes);
 const handle=middleware(directory,'/tricia-linewberg-portfolio/');
 const server=createServer((req,res)=>handle(req,res,()=>{res.statusCode=404;res.end();}));
 try{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const origin=`http://127.0.0.1:${server.address().port}`;
  for(const prefix of ['/','/tricia-linewberg-portfolio/']){
   const url=origin+prefix+'images/%232a1a30%20(8).png';
   const response=await fetch(url);assert.equal(response.status,200);assert.equal(response.headers.get('content-type'),'image/png');
   assert.deepEqual(Buffer.from(await response.arrayBuffer()),bytes);
   const head=await fetch(url,{method:'HEAD'});assert.equal(head.headers.get('content-length'),String(bytes.length));assert.equal((await head.arrayBuffer()).byteLength,0);
  }
  assert.equal((await fetch(origin+'/images/missing.png')).status,404);
 }finally{await new Promise(resolve=>server.close(resolve));await rm(directory,{recursive:true,force:true});}
});
