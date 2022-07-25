import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Layout from "../components/layout"

export default function Page() {
  const router = useRouter()

  const { data, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/api/auth/signin")
    },
  })

  if (status === "loading") {
    return (
      <Layout>
        <div>Page Loading...</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div>
        <h1>SRC President</h1>
        <p>Choose your next SRC President</p>
      </div>
      <div>
        <h1>SRC General Secretary</h1>
        <p>Choose your next SRC General Secretary</p>
      </div>
    </Layout>
  )
}
