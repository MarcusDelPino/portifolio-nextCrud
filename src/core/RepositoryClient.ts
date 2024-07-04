import Client from "./Client";

export default interface RepositoryClient {
    salvar(client: Client): Promise<Client>
    excluir(client: Client): Promise<void>
    getAll(): Promise<Client[]>
}