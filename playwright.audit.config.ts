import {defineConfig} from '@playwright/test';
export default defineConfig({
 testDir:'./audit',testMatch:'visual.spec.ts',timeout:60000,workers:2,fullyParallel:true,
 use:{baseURL:process.env.AUDIT_URL||'http://127.0.0.1:4173',viewport:{width:1440,height:900}},
 snapshotPathTemplate:'{testDir}/../work/audit/baseline/{arg}{ext}',
 outputDir:'work/audit/results',reporter:[['list'],['json',{outputFile:'work/audit/results.json'}]],
 expect:{toMatchSnapshot:{maxDiffPixels:0,threshold:0}},
});
