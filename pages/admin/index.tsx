import { Text } from "@geist-ui/core"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Layout from "../../components/layout"

export default function Page() {
  const router = useRouter()

  const { data, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/api/auth/signin")
    },
  })

  if (data?.user?.provider === "google") {
    return (
      <Layout>
        <Text h1>You are not permitted to access this page.</Text>
      </Layout>
    )
  }

  if (status === "loading") {
    return (
      <Layout>
        <div>Page Loading...</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Text h1>Admin Dashboard</Text>
    </Layout>
  )
}
