import {defineConfig} from '@playwright/test';
export default defineConfig({
 testDir:'./audit',testMatch:'compatibility.spec.ts',timeout:60000,workers:2,
 use:{baseURL:'http://127.0.0.1:4173'},
 projects:[{name:'chromium',use:{browserName:'chromium'}},{name:'firefox',use:{browserName:'firefox'}},{name:'webkit',use:{browserName:'webkit'}}],
 reporter:[['list'],['json',{outputFile:'work/audit/compatibility.json'}]],outputDir:'work/audit/compatibility-results',
});
