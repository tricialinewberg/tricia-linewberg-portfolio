import test from 'node:test';
import assert from 'node:assert/strict';
import {setupTouchFeedback} from '../../src/touch-motion.ts';

test('pointer feedback preserves pooling/timing and releases timers, layers and listeners',t=>{
 t.mock.timers.enable({apis:['setTimeout']});
 const previous={window:globalThis.window,document:globalThis.document,Node:globalThis.Node,Element:globalThis.Element};
 const created=[];
 class Element extends EventTarget {
  children=[];style={};className='';kind='';parent=null;
  classList={values:new Set(),add(value){this.values.add(value);},remove(value){this.values.delete(value);}};
  setAttribute(){} closest(){return this.kind==='card'?this:null;} contains(node){return node===this;}
  matches(){return this.kind==='card';}
  append(child){child.parent=this;this.children.push(child);}
  remove(){if(this.parent)this.parent.children=this.parent.children.filter(x=>x!==this);}
  animate(frames,options){const animation={frames,options,cancelled:false,cancel(){this.cancelled=true;},onfinish:null};created.push(animation);return animation;}
 }
 const document=new EventTarget();document.body=new Element();document.createElement=()=>new Element();
 const window=new EventTarget();window.getSelection=()=>({toString:()=>''});
 const media=new EventTarget();media.matches=false;
 const card=new Element();card.kind='card';
 const send=(type,extra={})=>{const event=new Event(type);Object.assign(event,{pointerType:'touch',pointerId:1,isPrimary:true,button:0,clientX:100,clientY:100,...extra});Object.defineProperty(event,'target',{value:card});document.dispatchEvent(event);};
 let dispose=()=>{};
 try{
  Object.assign(globalThis,{window,document,Element,Node:Element});dispose=setupTouchFeedback(media);
  send('pointerdown');send('pointerup');assert.equal(document.body.children.length,1);assert.equal(document.body.children[0].children.length,9);
  assert.equal(created.length,9);assert.ok(created.every(a=>a.options.duration===720));assert.ok(card.classList.values.has('touch-lit'));
  t.mock.timers.tick(949);assert.ok(card.classList.values.has('touch-lit'));t.mock.timers.tick(1);assert.ok(!card.classList.values.has('touch-lit'));
  send('pointerdown');send('pointerup');assert.equal(document.body.children.length,1);assert.ok(created.slice(0,9).every(a=>a.cancelled));
  dispose();assert.equal(document.body.children.length,0);assert.ok(!card.classList.values.has('touch-lit'));assert.ok(created.every(a=>a.cancelled));
  const count=created.length;send('pointerdown');send('pointerup');t.mock.timers.tick(2000);assert.equal(created.length,count);
  dispose=setupTouchFeedback(media);send('pointerdown');send('pointermove',{clientY:140});send('pointerup',{clientY:140});assert.equal(created.length,count);
  send('pointerdown');document.dispatchEvent(new Event('scroll'));send('pointerup');assert.equal(created.length,count);
  send('pointerdown');send('pointercancel');send('pointerup');assert.equal(created.length,count);
  send('pointerdown');send('pointerup');media.matches=true;media.dispatchEvent(new Event('change'));assert.equal(document.body.children.length,0);
  t.mock.timers.tick(950);send('pointerdown');send('pointerup');assert.ok(card.classList.values.has('touch-lit'));assert.equal(document.body.children.length,0);
 }finally{dispose();Object.assign(globalThis,previous);}
});
