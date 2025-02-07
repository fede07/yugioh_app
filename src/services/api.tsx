import axios from 'axios'
import {Card} from "../types/Card.ts"

const BASE_URL = "https://db.ygoprodeck.com/api/v7"

export const getAllCards = async (): Promise<Card[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/cardinfo.php`)
    return response.data.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getCardById = async (id: string): Promise<Card> => {
  try {
    const response = await axios.get(`${BASE_URL}/cardinfo.php?id=${id}`)
    return response.data.data[0]
  } catch (error) {
    console.log(error)
    return {} as Card
  }
}
