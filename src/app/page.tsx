"use client"
import ButtonPage from "@/components/Button"
import LayoutPage from "@/components/LayoutPage"
import Table from "@/components/Table"
import Formulary from "./../components/Formulary"
import { useLogicContext } from "@/hooks/useContext"

export default function Home() {
  const {
    pageState,
    client,
    clients,
    selectClient,
    removeClient,
    saveNewClient,
    newClient,
    setPageState,
  } = useLogicContext()

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
