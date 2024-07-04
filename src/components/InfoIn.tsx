type InfoInProps = {
  typeInput?: "text" | "number"
  textArea: string
  valueInput: string | number
  valueChange?: (valueInfo: any) => void 
  onlyRead?: boolean

}

export default function InfoIn({ typeInput, textArea, valueInput, onlyRead, valueChange }: InfoInProps) {
  return (
    <div className={`flex flex-col items-center justify-center`}>
      <label
        htmlFor='textArea'
        className={`my-5 ml-20 text-lg w-full font-bold `}
      >
        {textArea}
      </label>
      <input
        type={typeInput ?? "text"}
        disabled={onlyRead}
        value={valueInput}
        onChange={(e) => valueChange?.(e.target.value)}
        className={`bg-indigo-100 ${onlyRead ? 'font-bold' : 'hover:bg-white'} w-[95%] h-12 px-2 rounded-md  outline-none 
                    border border-indigo-700 hover:border-indigo-400 focus:border-purple-400
                    `}
      />
    </div>
  )
}
