export const HEADER_NAV_OPTIONS = [
    { name: 'Como funciona', rout: '/home#homeComoFunciona' },
    { name: 'Anuncie', rout: '/home' },
    { name: 'Ajuda', rout: 'https://api.whatsapp.com/send?phone=556296611324&text=Ol%C3%A1%20gostaria%20de%20tirar%20uma%20duvida!' },
]

export const HEADER_MENU_OPTIONS = [
    { name: 'Sala de Reunião', img: 'assets/imgs/header/sala_reuniao.jpg', rout: '/home' },
    { name: 'Mesas', img: 'assets/imgs/header/mesas.jpg', rout: '/home' },
    { name: 'Salas Privativas', img: 'assets/imgs/header/salas_privativas.jpg', rout: '/home' },
    { name: 'Auditórios', img: 'assets/imgs/header/auditorios.jpg', rout: '/home' },
    { name: 'Serviços', img: 'assets/imgs/header/servicos.jpg', rout: '/home' },
    { name: 'Palestras e Cursos', img: 'assets/imgs/header/palestras.jpg', rout: '/home' },
]

export const USER_SESSION = 'user_data';
export const USER_TOKEN = 'user_token';
export const EXPIRE_AT = 'expire_at'

export const enum Passos_signup {
    Primeiro = 0,
    Segundo = 1,
    Terceiro = 2,
    Quarto = 3
}

export const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const CURRENCY_PATTERN = /^\$?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/

export const INFORMACOES_ADICIONAIS_LIMITE = 16;

export const ALUGAVEL_STATUS = {
    WAITING: { value: 'waiting', name: 'Em Análise' },
    APPROVED: { value: 'approved', name: 'Aprovado' },
    DISAPPROVED: { value: 'disapproved', name: 'Reprovado' }
};

export enum ENUM_ALUGAVEL_CARACTERISTICAS {
    AREA = 1,
    INTERNET,
    QUANTIDADE_MESAS,
    QUANTIDADE_VAGAS,
    HORARIO_FUNCIONAMENTO,
    QUANTIDADE_PESSOAS
}