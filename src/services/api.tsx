import axios from 'axios'
import {Card} from "../types/Card.ts"

const BASE_URL = "https://db.ygoprodeck.com/api/v7"

export const getAllCards = async (): Promise<Card[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/cardinfo.php`)
    return response.data.data
  } catch (error) {
    console.log(error)
    throw error
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

export const getCardsByName = async (name: string): Promise<Card[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/cardinfo.php?fname=${name}`)
    return response.data.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getCardsByArchetype = async (archetype: string): Promise<Card[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/cardinfo.php?archetype=${archetype}`)
    return response.data.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getCardsByFilter = async (filter: string): Promise<Card[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/cardinfo.php?${filter}`)
    return response.data.data
  } catch (error) {
    console.log((error as Error).message)
    return []
  }
}

export const getCardsByFilterPaginated = async (filter: string, limit: number, offset: number): Promise<{data: Card[]; total: number}> => {
  try {
    const response = await axios.get(`${BASE_URL}/cardinfo.php?${filter}&num=${limit}&offset=${offset}`)
    return {
      data: response.data.data,
      total: response.data.meta.total_rows
    }
  } catch (error) {
    console.log((error as Error).message)
    return {
      data: [],
      total: 0
    }
  }
}

export const getCardsLimitOffset = async (limit: number, offset: number): Promise<{data: Card[]; total: number}> => {
  try {
    const response = await axios.get(`${BASE_URL}/cardinfo.php?num=${limit}&offset=${offset}`)
    return {
      data: response.data.data,
      total: response.data.meta.total_rows
    }
  } catch (error) {
    console.log(error)
    return {
      data: [],
      total: 0
    }
  }
}

export const getTotalCards = async (): Promise<number> => {
  try {
    const response = await axios.get(`${BASE_URL}/cardinfo.php?num=1&offset=0`)
    return response.data.meta.total_rows
  } catch (error) {
    console.log(error)
    return 0
  }
}
