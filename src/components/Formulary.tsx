import Client from "@/core/Client"
import ButtonPage from "./Button"
import InfoIn from "./InfoIn"
import { useState } from "react"

type FormularyProps = {
  client: Client
  canceled: () => void
  changeClient?: (client: Client) => void
}

export default function Formulary({ client, canceled, changeClient }: FormularyProps) {
  const [name, setName] = useState<string>(client?.name ?? "")
  const [age, setAge] = useState<number>(client?.age ?? 0)

  return (
    <div className={`bg-indigo-200 w-full rounded-lg`}>
      {client?.id ? (<InfoIn textArea='Código Id' valueInput={client.id} onlyRead />) : false}
      <InfoIn textArea='Nome' valueInput={name} valueChange={setName} />
      <InfoIn textArea='Idade' valueInput={age} typeInput='number' valueChange={setAge} />
      <div className={`flex gap-3 justify-end p-8`}>
        <ButtonPage color='blue' stateNow={() => changeClient?.(new Client(name, age, client?.id) )}>{client?.id ? 'Alterar' : 'Salvar'}</ButtonPage>
        <ButtonPage stateNow={canceled} color='gray' >Cancelar</ButtonPage>
      </div>
    </div>
  )
}
