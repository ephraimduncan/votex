import { Button, Grid, Radio, Text } from "@geist-ui/core"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"
import Layout from "../../components/layout"
import Candidate from "../../components/Candidate"
import { ArrowLeft, Check } from "@geist-ui/icons"
import { GetStaticProps } from "next"
import prisma from "../../lib/prismaClient"
import { VoteCandidateProps } from "../../types/types"

export default function Page({ candidates }: VoteCandidateProps) {
  const router = useRouter()
  const [vote, setVote] = useState<string | number>("")

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

  const formSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log(vote)
  }

  return (
    <Layout>
      <form onSubmit={formSubmitHandler}>
        <Grid marginBottom={2}>
          <Text h1 my={0}>
            SRC Treasurer
          </Text>
          <Radio.Group
            value={vote}
            onChange={(val) => {
              setVote(val)
              console.log(val)
            }}
          >
            {candidates.map(({ name, programme, id }) => {
              return (
                <Radio value={id} key={id}>
                  <Candidate
                    name={name}
                    programme={programme}
                    imageSrc="/logo.jpg"
                  />
                </Radio>
              )
            })}
          </Radio.Group>
        </Grid>

        <Button
          my={2}
          marginRight={1}
          auto
          icon={<ArrowLeft />}
          scale={1.2}
          onClick={() => router.push("/dashboard")}
        >
          Back
        </Button>
        <Button
          my={2}
          auto
          icon={<Check />}
          type="success"
          scale={1.2}
          onClick={formSubmitHandler}
        >
          Vote
        </Button>
      </form>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const candidates = await prisma.candidate.findMany({
    where: { portfolio: { equals: "SRC Treasurer" } },
  })
  return {
    props: { candidates },
  }
}
