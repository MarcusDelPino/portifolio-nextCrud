"use client"
import ColectionClient from "@/backend/db/ColectionClient"
import Client from "@/core/Client"
import RepositoryClient from "@/core/RepositoryClient"
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

// Define o tipo para o valor do contexto
type LogicContextType = {
  client: Client
  clients: Client[]
  pageState: string
  selectClient: (client: Client) => void
  removeClient: (client: Client) => Promise<void>
  newClient: () => void
  saveNewClient: (client: Client) => Promise<void>
  setPageState: Dispatch<SetStateAction<string>>
}

type ContextProviderProps = {
  children: ReactNode
}

// Cria o contexto com um valor padrão vazio que será substituído pelo provider
const LogicContext = createContext<LogicContextType | undefined>(undefined)

export default function ContextProvider({ children }: ContextProviderProps) {
  const repo: RepositoryClient = useMemo(() => new ColectionClient(), [])

  const [pageState, setPageState] = useState<string>("Cadastrados")
  const [client, setClient] = useState<Client>(Client.voidClient())
  const [clients, setClients] = useState<Client[]>([])

  const getAll = () => {
    repo.getAll().then((clients) => {
      setClients(clients)
      setPageState("Cadastrados")
    })
  }

  useEffect(getAll, [repo])

  const selectClient = (client: Client) => {
    setClient(client)
    setPageState("Alterar Cadastro")
  }

  const removeClient = async (client: Client) => {
    await repo.excluir(client)
    getAll()
  }

  const newClient = () => {
    setClient(Client.voidClient())
    setPageState("Cadastrar novo cliente")
  }

  const saveNewClient = async (client: Client) => {
    await repo.salvar(client)
    getAll()
  }

  return (
    <LogicContext.Provider
      value={{
        client,
        clients,
        pageState,
        selectClient,
        removeClient,
        newClient,
        saveNewClient,
        setPageState,
      }}
    >
      {children}
    </LogicContext.Provider>
  )
}

export const useLogicContext = () => {
  const context = useContext(LogicContext)
  if (!context) {
    throw new Error("Context Fail")
  }
  return context
}
