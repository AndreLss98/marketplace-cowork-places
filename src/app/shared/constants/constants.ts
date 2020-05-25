export const HEADER_NAV_OPTIONS = [
    {name: 'Como funciona', rout: '/home#homeComoFunciona'},
    {name: 'Anuncie', rout: '/home'},
    {name: 'Ajuda', rout: '/home'}, 
    ]

export const HEADER_MENU_OPTIONS = [
    {name:'Sala de Reunião' , img: 'assets/imgs/header/sala_reuniao.png', rout: '/home'},
    {name:'Mesas' , img: 'assets/imgs/header/mesas.png', rout: '/home'},
    {name:'Salas Privativas' , img: 'assets/imgs/header/salas_privativas.png', rout: '/home'},
    {name:'Auditórios' , img: 'assets/imgs/header/auditorios.png', rout: '/home'},
    {name:'Serviços' , img: 'assets/imgs/header/servicos.png', rout: '/home'},
    {name:'Palestras e Cursos' , img: 'assets/imgs/header/palestras.png', rout: '/home'},
]

export const USER_SESSION = 'user_data';
export const USER_TOKEN = 'user_token';

export const enum Passos {
    Primeiro = 0,
    Segundo = 1,
    Terceiro = 2,
    Quarto = 3
}

export const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/