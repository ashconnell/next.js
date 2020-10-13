import { Data } from '../components/Data'

export default function Home() {
  return (
    <>
      <Data endpoint="/api/foo" />
      <Data endpoint="/api/bar" />
    </>
  )
}
