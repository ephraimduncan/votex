import { Table, Text } from "@geist-ui/core"
import { getSession, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Layout from "../components/layout"
import { GetServerSideProps } from "next"
import prisma from "../lib/prismaClient"
import { Vote } from "@prisma/client"

export default function Page({ votes }: { votes: Vote[] }) {
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

  if (data.user.provider === "credentials") {
    router.push("/admin")
    return <></>
  }

  const tableData = votes.map((vote) => {
    return { portfolio: vote.portfolio, candidate: vote.candidate?.name }
  })

  return (
    <Layout>
      <Text h1>Your Votes</Text>
      <Table data={tableData}>
        <Table.Column prop="portfolio" label="portfolio" />
        <Table.Column prop="candidate" label="candidate" />
      </Table>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  const votes = await prisma.vote.findMany({
    where: { User: { email: { equals: session?.user.email } } },
    include: { candidate: { select: { name: true } } },
  })

  return {
    props: { votes },
  }
}
