export const HOME_TEXT = 
    {
        infoTopTitle: 'Facilitamos a conexão entre espaços e pessoas.',
        searchTitle: 'Seu negócio livre para evoluir.',
        searchContent: 'A liberdade de usar o espaço quando quiser e por quanto tempo precisar. Sem barreiras para o seu crescimento. Espaço certo pra sua necessidade, seja trabalho, descanso, estudo ou diversão. Você escolhe!'
    }

export const HOME_COMO_FUNCIONA = [
    'Somos uma plataforma que ajuda os espaços e serviços a encontrarem as pessoas.',
    'Queremos com isso ajudar a otimizar o processo de locação compartilhada e oferta de serviços.',
    'A contratação é feita direta com o Proprietário. Não somos intermediários.',
    'Com a variedade de ofertas e a clareza na divulgação, acreditamos que encontrará o que procura.',
    'Ajudamos na gestão de contratos e pagamentos.',
]

export const HOME_INFO_MIDDLE = [
    {icon: 'mao.svg', title: 'Tudo num clique.' , text: 'Com a variedade de ofertas e a clareza na divulgação, acreditamos que encontrará o que procura.'},
    {icon: 'play.svg', title: 'Todo controle.', text: 'Você tem controle de tudo e negocia como quiser. A contratação é feita direto como proprietário. '},
    {icon: 'smile.svg', title: 'Sem preocupação.', text: 'Ajudamos na gestão de contrato e pagamentos.'},
    {icon: 'relogio.svg', title: 'Mais tempo pra você. ', text: 'Queremos com isso ajudar a otimizar o processo de locação compartilhada e oferta de serviços'}

]



export const HEADER_NAV_OPTIONS = [
    { name: 'Como Funciona', rout: '/home#comoFunciona', target: '' },
    // { name: 'Anuncie', rout: '/user/anuncios/criaranuncio', target: '_self' },
    { name: 'Ajuda', rout: 'https://api.whatsapp.com/send?phone=556296611324&text=Ol%C3%A1%20gostaria%20de%20tirar%20uma%20duvida!', target: '_blank' },
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
export const EXPIRE_AT = 'expires_at'

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
    DISAPPROVED: { value: 'disapproved', name: 'Reprovado' },
    REMOVED: { value: 'removed', name: 'Removido' }
};

export const USUARIO_STATUS = {
    WAITING: { value: 'waiting', name: 'Em Análise' },
    APPROVED: { value: 'approved', name: 'Aprovado' },
    DISAPPROVED: { value: 'disapproved', name: 'Reprovado' },
};

export const ALUGUEL_STATUS = {
    CREATED: { value: 'created', name: 'Aguardando aprovação' },
    ACTIVE: { value: 'active', name: 'Ativos' },
    CANCELED: { value: 'canceled', name: 'Cancelados' }
};

export enum ENUM_ALUGAVEL_CARACTERISTICAS {
    AREA = 1,
    INTERNET,
    QUANTIDADE_MESAS,
    QUANTIDADE_VAGAS,
    HORARIO_FUNCIONAMENTO,
    QUANTIDADE_PESSOAS
}

export const TIPOS_CAMPOS = {
    INTERVALO: {
        nome: 'intervalo',
        campos: {
            min: {
                type: 'number',
                label: 'Valor mínimo',
                required: true
            },
            max: {
                type: 'number',
                label: 'Valor máximo',
                required: true
            },
            step: {
                type: 'number',
                label: 'Salto',
                required: false
            },
            standard: {
                type: 'number',
                label: 'Valor inicial',
                required: false
            },
        }
    },
    SELECAO: {
        nome: 'selecao',
        campos: {
            multiple: {
                type: 'boolean',
                label: 'Mais de um valor permitido?',
                required: true
            }
        }
    },
    BINARIO: {
        nome: 'binario',
        campos: {
            standard: {
                type: 'boolean',
                label: 'Valor padrão',
                required: true
            }
        }
    },
    TEXTO_SIMPLES: {
        nome: 'texto_simples',
        campos: {
            placeholder: {
                type: 'text',
                label: 'Placeholder',
                required: true
            }
        }
    },
    AREA_TEXTO: {
        nome: 'area_texto',
        campos: {
            min_rows: {
                type: 'number',
                label: 'Quantidade mínima de linhas',
                required: true
            },
            max_rows: {
                type: 'number',
                label: 'Quantidade máxima de linhas',
                required: true
            },
            max_length: {
                type: 'number',
                label: 'Quantidade máxima de caracteres',
                required: true
            }
        }
    },
    NUMERICO: {
        nome: 'numerico',
        campos: {
            placeholder: {
                type: 'text',
                label: 'Placeholder',
                required: true
            }
        }
    }
}