export default class Client {
    #name: string
    #age: number
    #id: string | undefined
    
  constructor(name: string, age: number, id: string | undefined = undefined) {
      this.#name = name
      this.#age = age
      this.#id = id
  }

  static voidClient() {
    return new Client('', 0)
  }

  get id() {
    return this.#id
  }
  get name() {
    return this.#name
  }
  get age() {
    return this.#age
  }
}
