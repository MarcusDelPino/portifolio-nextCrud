"use client"
import ButtonPage from "@/components/Button"
import LayoutPage from "@/components/LayoutPage"
import Table from "@/components/Table"
import Client from "@/core/Client"
import Formulary from "./../components/Formulary"
import { useEffect, useState } from "react"
import RepositoryClient from "@/core/RepositoryClient"
import ColectionClient from "@/backend/db/ColectionClient"

export default function Home() {
  const repo: RepositoryClient = new ColectionClient()

  const [pageState, setPageState] = useState<string>("Cadastrados")
  const [client, setClient] = useState<Client>(Client.voidClient())
  const [clients, setClients] = useState<Client[]>([])

  console.log(clients)

  const getAll = () => {
    repo.getAll().then((clients) => {
      setClients(clients)
      setPageState("Cadastrados")
    })
  }
  useEffect(getAll, [])

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

  const renderState = () => {
    return pageState == "Cadastrados" ? (
      <Table
        client={clients}
        selectClient={selectClient}
        removeClient={removeClient}
      />
    ) : (
      <Formulary
        client={client}
        changeClient={saveNewClient}
        canceled={() => setPageState("Cadastrados")}
      />
    )
  }

  return (
    <div
      className={`
        flex justify-center items-center h-screen
        bg-gradient-to-tr from-blue-500 to-indigo-500
        `}
    >
      <LayoutPage title={pageState}>
        <div className={`flex justify-end`}>
          {pageState == "Cadastrados" && (
            <ButtonPage color='green' stateNow={newClient}>
              Novo Cliente
            </ButtonPage>
          )}
        </div>
        {renderState()}
      </LayoutPage>
    </div>
  )
}
