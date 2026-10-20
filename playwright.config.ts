import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests',testMatch:'**/*.spec.ts',use:{baseURL:'http://127.0.0.1:4173',headless:true},reporter:'list',outputDir:'work/test-results'});
