import {renderToString} from 'react-dom/server';
import App from './App';
export {translations,locales,htmlLang} from './locales';
import type {Locale} from './locales';
export const render=(locale:Locale)=>renderToString(<App locale={locale}/>);
