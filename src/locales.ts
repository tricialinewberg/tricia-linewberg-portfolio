export const locales = ['pt-br','en','es'] as const;
export type Locale = typeof locales[number];
export const languages = {'pt-br':'Português (Brasil)',en:'English',es:'Español'};
export const htmlLang = {'pt-br':'pt-BR',en:'en',es:'es'};
export interface Copy {
 title:string; description:string; nav:string[]; skip:string; menu:string; close:string; language:string;
 welcome:string; intro:string; subtitle:string; ticket:string;
 portrait:string; missingPortrait:string; missingCover:string; cover:string; home:string;
 act:string; works:string; worksIntro:string; view:string; newTab:string; featured:string;
 descriptions:string[]; about:string; aboutLead:string; bio:string; study:string;
 skillsTitle:string; skills:string[]; recognition:string; awards:string[]; awardsDetail:string[];
 contact:string; contactLead:string; contactBody:string; message:string; email:string; footer:string; top:string;
}
export const translations:Record<Locale,Copy> = {
 'pt-br': {
 title:'Trícia Linewberg — UX/UI & Product Designer | The Legend', description:'Conheça os projetos de Trícia Linewberg: pensamento de produto, design de interfaces e narrativas digitais. Portfólio de UX/UI e Product Design.',
 nav:['Projetos','Sobre','Contato'],skip:'Ir para o conteúdo',menu:'Abrir menu',close:'Fechar menu',language:'Selecionar idioma',
 welcome:'Bem-vindo, bem-vinda!',intro:'Você chegou ao portfólio de',subtitle:'Um espetáculo de estratégia de produto, design de interfaces e narrativas digitais.',ticket:'ADMIT ONE — conhecer os projetos',
 portrait:'Trícia Linewberg usando cartola em um retrato teatral',missingPortrait:'Retrato original em breve',missingCover:'Capa original em breve',cover:'Capa do projeto',home:'Trícia Linewberg — início',
 act:'Ato',works:'Projetos',worksIntro:'Confira alguns dos trabalhos que já desenvolvi.',view:'Ver no Behance',newTab:'abre em uma nova aba',featured:'1º lugar · Hack4Freedom 2026',
 descriptions:["Carteira Bitcoin · 1º lugar no Hack4Freedom 2026.","Educação Bitcoin por meio da beleza.","Website de ficção · Projeto de fã.","Auditoria UX/UI e redesign de experiência."],
 about:"Sobre",aboutLead:"Designer com experiência em UX/UI, produto e experiências digitais.",bio:"Trabalho com design desde 2020, quando comecei criando identidades visuais e peças para o digital. Desde 2024, atuo com UX/UI e Product Design, desenvolvendo experiências que vão da pesquisa à prototipação e validação.",study:"Também desenvolvo interfaces web e utilizo ferramentas de IA no processo de implementação.",
 skillsTitle:"Competências",skills:["UX/UI Designer","Product Designer","+6 anos de experiência","Pós em Inovação e Design Digital","IA no processo criativo","Figma & Prototipação","Sites responsivos","Web Designer"],
 recognition:'Histórias que ganharam destaque',awards:['1º lugar','1º lugar'],awardsDetail:['Hack4Freedom 2026 · SATRA Wallet','UX Writing para Chatbots Bootcamp · Novembro de 2025'],
 contact:'O próximo ato começa com uma conversa.',contactLead:'UM ÚLTIMO CONVITE',contactBody:'Tem um projeto em mente? Vamos conversar sobre o que podemos criar juntos.',message:'Olá, Trícia! Gostaria de conversar sobre um projeto de design.',email:'Enviar email',footer:'Pensado com intenção. Criado com imaginação.',top:'Voltar ao início'
 },
 en: {
 title:'Trícia Linewberg — UX/UI & Product Designer | The Legend',description:'Explore Trícia Linewberg’s selected work in product thinking, interface design, and digital storytelling. A UX/UI and Product Design portfolio.',
 nav:['Projects','About','Contact'],skip:'Skip to content',menu:'Open menu',close:'Close menu',language:'Select language',
 welcome:'Welcome, welcome!',intro:"You've arrived at the portfolio of",subtitle:'A grand display of product thinking, interface design, and digital storytelling.',ticket:'ADMIT ONE — explore selected works',
 portrait:'Trícia Linewberg wearing a top hat in a theatrical portrait',missingPortrait:'Original portrait coming soon',missingCover:'Original cover coming soon',cover:'Project cover for',home:'Trícia Linewberg — home',
 act:'Act',works:'Projects',worksIntro:'Take a look at some of the projects I’ve developed.',view:'View on Behance',newTab:'opens in a new tab',featured:'1st place · Hack4Freedom 2026',
 descriptions:["Bitcoin wallet · Hack4Freedom 2026 winner.","Bitcoin education through the language of beauty.","Fictional website · Fan project.","UX/UI audit and experience redesign."],
 about:"About",aboutLead:"Designer with experience in UX/UI, product, and digital experiences.",bio:"I’ve worked in design since 2020, when I started creating visual identities and digital graphics. Since 2024, I’ve worked in UX/UI and Product Design, developing experiences from research through prototyping and validation.",study:"I also develop web interfaces and use AI tools during implementation.",
 skillsTitle:"Competencies",skills:["UX/UI Designer","Product Designer","6+ years of experience","Postgraduate qualification in Innovation and Digital Design","AI in the creative process","Figma & Prototyping","Responsive websites","Web Designer"],
 recognition:'Stories in the spotlight',awards:['1st place','1st place'],awardsDetail:['Hack4Freedom 2026 · SATRA Wallet','UX Writing for Chatbots Bootcamp · November 2025'],
 contact:'The next act begins with a conversation.',contactLead:'ONE LAST INVITATION',contactBody:'Have a project in mind? Let’s talk about what we could create together.',message:'Hi, Trícia! I’d like to talk about a design project.',email:'Send an email',footer:'Thoughtfully designed. Imaginatively made.',top:'Back to top'
 },
 es: {
 title:'Trícia Linewberg — Diseñadora UX/UI y de Producto | The Legend',description:'Descubre los proyectos de Trícia Linewberg: visión de producto, diseño de interfaces y narrativas digitales. Portafolio de diseño UX/UI y de producto.',
 nav:['Proyectos','Sobre mí','Contacto'],skip:'Saltar al contenido',menu:'Abrir menú',close:'Cerrar menú',language:'Seleccionar idioma',
 welcome:'¡Bienvenido, bienvenida!',intro:'Has llegado al portafolio de',subtitle:'Una muestra de estrategia de producto, diseño de interfaces y narrativa digital.',ticket:'ADMIT ONE — explorar los proyectos',
 portrait:'Trícia Linewberg con sombrero de copa en un retrato teatral',missingPortrait:'Retrato original próximamente',missingCover:'Portada original próximamente',cover:'Portada del proyecto',home:'Trícia Linewberg — inicio',
 act:'Acto',works:'Proyectos',worksIntro:'Mira algunos de los proyectos que ya he desarrollado.',view:'Ver en Behance',newTab:'se abre en una pestaña nueva',featured:'1.er puesto · Hack4Freedom 2026',
 descriptions:["Billetera Bitcoin · Ganadora del Hack4Freedom 2026.","Educación Bitcoin a través de la belleza.","Sitio de ficción · Proyecto de fan.","Auditoría UX/UI y rediseño de experiencia."],
 about:"Sobre mí",aboutLead:"Diseñadora con experiencia en UX/UI, producto y experiencias digitales.",bio:"Trabajo en diseño desde 2020, cuando empecé creando identidades visuales y piezas digitales. Desde 2024, trabajo en UX/UI y diseño de producto, desarrollando experiencias que abarcan desde la investigación hasta el prototipado y la validación.",study:"También desarrollo interfaces web y utilizo herramientas de IA en el proceso de implementación.",
 skillsTitle:"Competencias",skills:["Diseñadora UX/UI","Diseñadora de producto","Más de 6 años de experiencia","Posgrado en Innovación y Diseño Digital","IA en el proceso creativo","Figma y prototipado","Sitios web responsivos","Diseñadora web"],
 recognition:'Historias que se destacaron',awards:['1.er puesto','1.er puesto'],awardsDetail:['Hack4Freedom 2026 · SATRA Wallet','Bootcamp de UX Writing para Chatbots · Noviembre de 2025'],
 contact:'El próximo acto comienza con una conversación.',contactLead:'UNA ÚLTIMA INVITACIÓN',contactBody:'¿Tienes un proyecto en mente? Hablemos de lo que podemos crear juntos.',message:'¡Hola, Trícia! Me gustaría conversar sobre un proyecto de diseño.',email:'Enviar email',footer:'Pensado con intención. Creado con imaginación.',top:'Volver al inicio'
 }
};
