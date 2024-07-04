import Client from "@/core/Client"
import { IconEdit, IconRemove } from "@/icons/Icons"
import { Roboto } from "next/font/google"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
})

type TableProps = {
  client: Client[]
  selectClient?: (client: Client) => void
  removeClient?: (client: Client) => void
}

export default function Table({
  client,
  selectClient,
  removeClient,
}: TableProps) {
  const showActions = selectClient || removeClient

  const renderHeadTable = () => {
    return (
      <tr
        className={`bg-gradient-to-r from-purple-500 to-blue-500 h-12  text-gray-100 font-medium ${roboto.className}`}
      >
        <th className={`text-left px-4 `}>Código</th>
        <th className={`text-left px-4`}>Nome</th>
        <th className={`text-left px-4`}>Idade</th>
        {showActions ? <th className={`text-center px-4`}>Ações</th> : false}
      </tr>
    )
  }
  const renderBodyTable = () => {
    return client?.map((client: any, ind: number) => {
      return (
        <tr
          key={client.id}
          className={` h-10 w-full ${
            ind % 2 == 0
              ? "bg-gradient-to-r from-indigo-200 to-indigo-300"
              : "bg-gradient-to-r from-indigo-300 to-indigo-400"
          } 
          ${roboto.className} font-bold
          `}
        >
          <td className={`text-left px-4`}>{ind + 1}</td>
          <td className={`text-left px-4`}>{client.name}</td>
          <td className={`text-left px-4`}>{client.age}</td>
          {showActions ? renderActions(client) : false}
        </tr>
      )
    })
  }

  const renderActions = (client: Client) => {
    return (
      <td className={`flex justify-center items-center mt-1`}>
        {selectClient ? (
          <button
            onClick={() => selectClient?.(client)}
            className={`hover:bg-white/70 rounded-full p-1 text-green-800 h-8 w-8`}
          >
            {IconEdit}
          </button>
        ) : (
          false
        )}
        {removeClient ? (
          <button 
          onClick={() => removeClient?.(client)}
          className={`hover:bg-white/70 rounded-full p-1 text-red-500 h-8 w-8`}>
            {IconRemove}
          </button>
        ) : (
          false
        )}
      </td>
    )
  }

  return (
    <table className={`w-full table-auto rounded-xl overflow-hidden shadow-md shadow-black/50 mt-6`}>
      <thead>{renderHeadTable()}</thead>
      <tbody className={``}>{renderBodyTable()}</tbody>
    </table>
  )
}
