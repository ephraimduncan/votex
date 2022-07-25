import React from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Layout from "../components/layout"

interface LayoutProps {
  children: React.ReactNode
}

export default function WithAuth({ children }) {
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

  return children
}
