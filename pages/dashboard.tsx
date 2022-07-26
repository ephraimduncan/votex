import { Avatar, Button, Card, Grid, Radio, Text, User } from "@geist-ui/core"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"
import Image from "next/image"
import Layout from "../components/layout"
import Candidate from "../components/Candidate"
import { Check } from "@geist-ui/icons"
import Link from "next/link"

export default function Page() {
  const router = useRouter()
  const [srcPresidentVote, setSRCPresidentVote] = useState<string | number>("")
  const [srcGeneralSecretaryVote, setSRCGeneralSecretaryVote] = useState<
    string | number
  >("")
  const [srcTreasureVote, setSRCTreasurerVote] = useState<string | number>("")

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
    console.log(srcPresidentVote, srcTreasureVote, srcGeneralSecretaryVote)
  }

  return (
    <Layout>
      <Grid.Container alignItems="center">
        <Text h1>SRC President</Text>
        <Link href="/vote/src_president">
          <Button marginLeft={2} auto icon={<Check />} type="secondary">
            Vote
          </Button>
        </Link>
      </Grid.Container>

      <Grid.Container alignItems="center">
        <Text h1>SRC General Secretary</Text>
        <Link href="/vote/src_gen_sec">
          <Button marginLeft={2} auto icon={<Check />} type="secondary">
            Vote
          </Button>
        </Link>
      </Grid.Container>

      <Grid.Container alignItems="center">
        <Text h1>SRC Treasurer</Text>
        <Link href="/vote/src_treasurer">
          <Button marginLeft={2} auto icon={<Check />} type="secondary">
            Vote
          </Button>
        </Link>
      </Grid.Container>
    </Layout>
  )
}
