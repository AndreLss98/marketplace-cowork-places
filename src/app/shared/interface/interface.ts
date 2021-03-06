export interface LoginResponse {
    status: boolean;
    data: any
}

export interface User {
    email: string,
    nome: string,
    sobrenome: string,
    data_nascimento: Date,
    cpf: string,
    numero_1: string,
    numero_2?: string
    img_perfil?: string,
    senha: string
}

export interface highlightItem {
    local: string,
    description: string,
    image: string,
    cost: number,
    tax: number,
    rank: number,
    id: number,
}

export interface authUser {
    user:{
        id: number,
        perfil_id: number,
        email: string,
        nome: string,
        sobrenome: string,
        data_nascimento: any,
        numero: string,
        img_perfil: string,
        google_id: string,
        saldo: string
    },
    token: string,
    expires_at: number
}

export interface Alugavel {
	anunciante_id: number,
	tipo_id: number,
	taxa: number,
	descricao: string,
	valor: number,
    titulo: string,
    proprietario : boolean,
	local: {
		cep: number,
		pais: string,
		rua: string,
		cidade: string,
		estado: string,
		bairro: string,
		numero: number,
		complemento: string
	},
	caracteristicas: any,
	infos: any,
	imagens: any,
	documentos: any
}