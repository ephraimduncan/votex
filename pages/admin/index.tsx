import { Divider, Grid, Table, Text } from "@geist-ui/core"
import { Candidate, Vote } from "@prisma/client"
import { GetStaticProps } from "next"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Layout from "../../components/layout"
import prisma from "../../lib/prismaClient"

interface AdminProps {
  candidates: Candidate[]
  votes: Vote[]
}

export default function AdminPage({ candidates, votes }: AdminProps) {
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

  const voteResult = candidates
    .sort((a, b) => a.portfolio.localeCompare(b.portfolio))
    .map((candidate) => {
      return {
        portfolio: candidate.portfolio,
        name: candidate.name,
        votes: candidate.Votes.length ? candidate.Votes.length : "-",
      }
    })

  return (
    <Layout>
      <Text h1>Admin Dashboard</Text>
      <Divider />
      <Text h2>Total Votes Cast: {votes.length}</Text>
      <Grid>
        <Table data={voteResult}>
          <Table.Column prop="portfolio" label="portfolio" />
          <Table.Column prop="name" label="name" />
          <Table.Column prop="votes" label="Number of Votes" />
        </Table>
      </Grid>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const candidates = await prisma.candidate.findMany({
    include: {
      Votes: { select: { candidateId: true } },
    },
  })

  const votes = await prisma.vote.findMany({
    include: {
      candidate: { select: { name: true } },
    },
  })

  return {
    props: { candidates, votes },
  }
}
