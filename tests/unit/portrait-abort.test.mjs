import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {syncBuiltinESMExports} from 'node:module';
import {mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {PassThrough} from 'node:stream';
import config from '../../vite.config.mjs';

test('aborting a portrait response destroys its source file stream',async()=>{
 const directory=await mkdtemp(join(tmpdir(),'portfolio-abort-'));
 await mkdir(join(directory,'images'));await writeFile(join(directory,'images','#2a1a30 (8).png'),Buffer.alloc(128*1024));
 const original=fs.createReadStream;let source;
 try{
  fs.createReadStream=(...args)=>{source=original(...args);return source;};syncBuiltinESMExports();
  let handle;config.plugins[0].configurePreviewServer({config:{root:directory,build:{outDir:'.'},base:'/'},middlewares:{use(fn){handle=fn;}}});
  const response=new PassThrough();response.setHeader=()=>{};
  handle({method:'GET',url:'/images/%232a1a30%20(8).png'},response,()=>assert.fail('portrait not handled'));
  response.destroy();await new Promise(resolve=>setImmediate(resolve));assert.equal(source.destroyed,true);
  if(!source.closed)await new Promise(resolve=>source.once('close',resolve));
 }finally{fs.createReadStream=original;syncBuiltinESMExports();source?.destroy();await rm(directory,{recursive:true,force:true});}
});
