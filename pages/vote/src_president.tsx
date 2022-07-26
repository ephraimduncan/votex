import { Button, Grid, Radio, Text } from "@geist-ui/core"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"
import Layout from "../../components/layout"
import Candidate from "../../components/Candidate"
import { ArrowDownLeft, ArrowLeft, Check } from "@geist-ui/icons"

export default function Page() {
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
            SRC President
          </Text>
          <Radio.Group
            value={vote}
            onChange={(val) => {
              setVote(val)
              console.log(val)
            }}
          >
            <Radio value="src_general_secretary_1">
              <Candidate
                name="Jessica Sasa-Ewool"
                programme="Mining Engineering"
                imageSrc="/logo.jpg"
              />
            </Radio>
            <Radio value="src_general_secretary_2">
              <Candidate name="Jennifer Smith" programme="Mining Engineering" />
            </Radio>
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
