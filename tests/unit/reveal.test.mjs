import test from 'node:test';
import assert from 'node:assert/strict';
import {setupReveals} from '../../src/reveal.ts';

test('reveals unobserve immediately without waiting for animation events',()=>{
 const previous={window:globalThis.window,document:globalThis.document,IntersectionObserver:globalThis.IntersectionObserver};
 const element=()=>({dataset:{},classList:{values:new Set(),add(value){this.values.add(value);}}});
 const fresh=element(),old=element();old.dataset.revealed='true';let observer;
 class Observer {
  observed=new Set(); disconnected=false;
  constructor(callback,options){this.callback=callback;this.options=options;observer=this;}
  observe(el){this.observed.add(el);} unobserve(el){this.observed.delete(el);} disconnect(){this.observed.clear();this.disconnected=true;}
 }
 try{
  globalThis.window={IntersectionObserver:Observer};globalThis.IntersectionObserver=Observer;
  globalThis.document={querySelectorAll:()=>[fresh,old]};
  const dispose=setupReveals();assert.deepEqual([...observer.observed],[fresh]);assert.equal(observer.options.threshold,.12);
  observer.callback([{target:fresh,isIntersecting:false}]);assert.equal(fresh.dataset.revealed,undefined);
  observer.callback([{target:fresh,isIntersecting:true}]);assert.equal(fresh.dataset.revealed,'true');assert.ok(fresh.classList.values.has('is-revealed'));
  assert.equal(observer.observed.size,0);dispose();assert.equal(observer.disconnected,true);
  const disposeAgain=setupReveals();assert.equal(observer.observed.size,0);disposeAgain();
  globalThis.window={};assert.doesNotThrow(()=>setupReveals()());
 }finally{Object.assign(globalThis,previous);}
});
