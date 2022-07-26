import { Text } from "@geist-ui/core"
import { Candidate } from "@prisma/client"
import { GetStaticProps } from "next"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Layout from "../../components/layout"
import prisma from "../../lib/prismaClient"

interface AdminProps {
  feed: Candidate[]
}

export default function AdminPage({ feed }: AdminProps) {
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
      <div>
        <pre>{JSON.stringify(feed, null, 2)}</pre>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.candidate.findMany()
  return {
    props: { feed },
  }
}
