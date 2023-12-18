export default interface Book {
  ID?: string
  userID?: string
  isbn: string
  title: string
  author: string
  publisher: string
  year: number
  pages: number
  rating: number
  note: string
  type: string
  genre: string
  readDate: Date
  ownedByMe: boolean
  cover: string
}
