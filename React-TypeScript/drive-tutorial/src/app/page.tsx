import { redirect } from 'next/navigation'
import { ROOT_FOLDER_ID } from '~/utils/drive'

export default function Home() {
  return redirect(`/f/${ROOT_FOLDER_ID}`) // TODO: Homepage
}
