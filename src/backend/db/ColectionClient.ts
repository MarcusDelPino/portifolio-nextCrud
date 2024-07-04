import Client from "@/core/Client";
import RepositoryClient from "@/core/RepositoryClient";
import { firestore } from "../config";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
  QueryDocumentSnapshot,
  DocumentData,
  WithFieldValue,
  FirestoreDataConverter,
} from "firebase/firestore";

export default class ColectionClient implements RepositoryClient {
  #conversor: FirestoreDataConverter<Client> = {
    toFirestore(client: WithFieldValue<Client>): DocumentData {
      return {
        name: client.name,
        age: client.age,
      };
    },

    fromFirestore(snapshot: QueryDocumentSnapshot): Client {
      const data = snapshot.data();
      return new Client(data.name, data.age, snapshot.id); // Adiciona o id aqui
    },
  };

  async salvar(client: Client): Promise<Client> {
    if (client?.id) {
      const clientDocRef = doc(firestore, "clients", client.id).withConverter(this.#conversor);
      await setDoc(clientDocRef, client);
      return client;
    } else {
      const clientColRef = collection(firestore, "clients").withConverter(this.#conversor);
      const docRef = await addDoc(clientColRef, client);
      const docSnap = await getDoc(docRef);
      return this.#conversor.fromFirestore(docSnap as QueryDocumentSnapshot);
    }
  }

  async excluir(client: Client): Promise<void> {
    if (client?.id) {
      const clientDocRef = doc(firestore, "clients", client.id).withConverter(this.#conversor);
      await deleteDoc(clientDocRef);
    } else {
      throw new Error("Client ID is required for deletion.");
    }
  }

  async getAll(): Promise<Client[]> {
    const clientColRef = collection(firestore, "clients").withConverter(this.#conversor);
    const querySnapshot = await getDocs(clientColRef);
    return querySnapshot.docs.map((doc) => this.#conversor.fromFirestore(doc as QueryDocumentSnapshot));
  }
}
