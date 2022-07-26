import { Button, Grid, Text } from "@geist-ui/core"
import { getProviders, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"
import Layout from "../../components/layout"
import { Check } from "@geist-ui/icons"
import Link from "next/link"

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
