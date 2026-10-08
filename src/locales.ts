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
 welcome:'Bem-vindo, bem-vinda.',intro:'Você chegou ao portfólio de',subtitle:'Um espetáculo de estratégia de produto, design de interfaces e narrativas digitais.',ticket:'ADMIT ONE — conhecer os projetos',
 portrait:'Trícia Linewberg usando cartola em um retrato teatral',missingPortrait:'Retrato original em breve',missingCover:'Capa original em breve',cover:'Capa do projeto',home:'Trícia Linewberg — início',
 act:'Ato',works:'Os grandes atos',worksIntro:'Projetos selecionados. Cada desafio, uma história para transformar em experiência.',view:'Ver no Behance',newTab:'abre em uma nova aba',featured:'1º lugar · Hack4Freedom 2026',
 descriptions:["Carteira Bitcoin · 1º lugar no Hack4Freedom 2026.","Educação Bitcoin por meio da beleza.","Website de ficção · Projeto de fã.","Auditoria UX/UI e redesign de experiência."],
 about:'Por trás da Legend',aboutLead:'Imaginação para explorar. Intenção para projetar.',bio:'Sou Trícia, UX/UI & Product Designer. Desde 2024, desenvolvo trabalhos freelance e projetos independentes, conectando pesquisa, pensamento de produto e cuidado com os detalhes. Minha experiência inclui fintechs e aplicativos Bitcoin — sempre com atenção às pessoas que estão do outro lado da tela.',study:'Estou concluindo a pós-graduação em Inovação e Design na UNINTER. Da primeira pergunta ao handoff, transformo ideias em experiências claras, acessíveis e possíveis de construir.',
 skillsTitle:'Nos bastidores do processo',skills:['Pesquisa e testes','Fluxos de usuário e wireframes','Interfaces de alta fidelidade e Figma','Design systems e acessibilidade','UX writing e handoff','Protótipos funcionais em HTML, CSS e JS'],
 recognition:'Histórias que ganharam destaque',awards:['1º lugar','1º lugar'],awardsDetail:['Hack4Freedom 2026 · SATRA Wallet','Projeto de bootcamp · UX Writing conversacional'],
 contact:'O próximo ato começa com uma conversa.',contactLead:'UM ÚLTIMO CONVITE',contactBody:'Tem um projeto em mente? Vamos conversar sobre o que podemos criar juntos.',message:'Olá, Trícia! Gostaria de conversar sobre um projeto de design.',email:'Enviar email',footer:'Pensado com intenção. Criado com imaginação.',top:'Voltar ao início'
 },
 en: {
 title:'Trícia Linewberg — UX/UI & Product Designer | The Legend',description:'Explore Trícia Linewberg’s selected work in product thinking, interface design, and digital storytelling. A UX/UI and Product Design portfolio.',
 nav:['Projects','About','Contact'],skip:'Skip to content',menu:'Open menu',close:'Close menu',language:'Select language',
 welcome:'Welcome, welcome.',intro:"You've arrived at the portfolio of",subtitle:'A grand display of product thinking, interface design, and digital storytelling.',ticket:'ADMIT ONE — explore selected works',
 portrait:'Trícia Linewberg wearing a top hat in a theatrical portrait',missingPortrait:'Original portrait coming soon',missingCover:'Original cover coming soon',cover:'Project cover for',home:'Trícia Linewberg — home',
 act:'Act',works:'The main acts',worksIntro:'Selected works. Every challenge, a story to turn into an experience.',view:'View on Behance',newTab:'opens in a new tab',featured:'1st place · Hack4Freedom 2026',
 descriptions:["Bitcoin wallet · Hack4Freedom 2026 winner.","Bitcoin education through the language of beauty.","Fictional website · Fan project.","UX/UI audit and experience redesign."],
 about:'Behind the Legend',aboutLead:'Imagination to explore. Intention to design.',bio:'I’m Trícia, a UX/UI & Product Designer. Since 2024, I’ve worked on freelance and independent projects, bringing together research, product thinking, and attention to detail. My experience includes fintech and Bitcoin apps — with care for the people on the other side of the screen.',study:'I’m completing postgraduate studies in Innovation and Design at UNINTER. From the first question to handoff, I turn ideas into clear, accessible experiences that can be built.',
 skillsTitle:'Behind the scenes of the process',skills:['Research and testing','User flows and wireframes','High-fidelity interfaces and Figma','Design systems and accessibility','UX writing and handoff','Functional HTML, CSS, and JS prototypes'],
 recognition:'Stories in the spotlight',awards:['1st place','1st place'],awardsDetail:['Hack4Freedom 2026 · SATRA Wallet','Bootcamp project · Conversational UX Writing'],
 contact:'The next act begins with a conversation.',contactLead:'ONE LAST INVITATION',contactBody:'Have a project in mind? Let’s talk about what we could create together.',message:'Hi, Trícia! I’d like to talk about a design project.',email:'Send an email',footer:'Thoughtfully designed. Imaginatively made.',top:'Back to top'
 },
 es: {
 title:'Trícia Linewberg — Diseñadora UX/UI y de Producto | The Legend',description:'Descubre los proyectos de Trícia Linewberg: visión de producto, diseño de interfaces y narrativas digitales. Portafolio de diseño UX/UI y de producto.',
 nav:['Proyectos','Sobre mí','Contacto'],skip:'Saltar al contenido',menu:'Abrir menú',close:'Cerrar menú',language:'Seleccionar idioma',
 welcome:'Bienvenido, bienvenida.',intro:'Has llegado al portafolio de',subtitle:'Una muestra de estrategia de producto, diseño de interfaces y narrativa digital.',ticket:'ADMIT ONE — explorar los proyectos',
 portrait:'Trícia Linewberg con sombrero de copa en un retrato teatral',missingPortrait:'Retrato original próximamente',missingCover:'Portada original próximamente',cover:'Portada del proyecto',home:'Trícia Linewberg — inicio',
 act:'Acto',works:'Los grandes actos',worksIntro:'Proyectos seleccionados. Cada desafío, una historia que transformar en experiencia.',view:'Ver en Behance',newTab:'se abre en una pestaña nueva',featured:'1.er puesto · Hack4Freedom 2026',
 descriptions:["Billetera Bitcoin · Ganadora del Hack4Freedom 2026.","Educación Bitcoin a través de la belleza.","Sitio de ficción · Proyecto de fan.","Auditoría UX/UI y rediseño de experiencia."],
 about:'Detrás de The Legend',aboutLead:'Imaginación para explorar. Intención para diseñar.',bio:'Soy Trícia, diseñadora UX/UI y de producto. Desde 2024, desarrollo trabajos freelance y proyectos independientes, combinando investigación, visión de producto y atención al detalle. Mi experiencia incluye fintech y aplicaciones Bitcoin, siempre pensando en las personas al otro lado de la pantalla.',study:'Estoy completando un posgrado en Innovación y Diseño en UNINTER. Desde la primera pregunta hasta el handoff, transformo ideas en experiencias claras, accesibles y viables.',
 skillsTitle:'Entre bastidores del proceso',skills:['Investigación y pruebas','Flujos de usuario y wireframes','Interfaces de alta fidelidad y Figma','Sistemas de diseño y accesibilidad','UX writing y handoff','Prototipos funcionales en HTML, CSS y JS'],
 recognition:'Historias que se destacaron',awards:['1.er puesto','1.er puesto'],awardsDetail:['Hack4Freedom 2026 · SATRA Wallet','Proyecto de bootcamp · UX Writing conversacional'],
 contact:'El próximo acto comienza con una conversación.',contactLead:'UNA ÚLTIMA INVITACIÓN',contactBody:'¿Tienes un proyecto en mente? Hablemos de lo que podemos crear juntos.',message:'¡Hola, Trícia! Me gustaría conversar sobre un proyecto de diseño.',email:'Enviar email',footer:'Pensado con intención. Creado con imaginación.',top:'Volver al inicio'
 }
};
