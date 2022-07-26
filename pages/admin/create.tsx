import React from "react"
import { Button, Input, Select, Spacer, Text } from "@geist-ui/core"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Layout from "../../components/layout"
import { UserPlus } from "@geist-ui/icons"

export default function CreateCandidatePage() {
  const router = useRouter()
  const [name, setName] = React.useState("")
  const [programme, setProgramme] = React.useState<string | string[]>("")
  const [portfolio, setPortfolio] = React.useState<string | string[]>("")

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

  async function handleCreateCandidate() {
    try {
      const body = { name, portfolio, programme }
      await fetch("/api/admin/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      await router.push("/admin")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <Text h1>Create A New Candidate</Text>
      <form>
        <Input
          placeholder="John Doe"
          width="50%"
          onChange={(e) => setName(e.target.value)}
          value={name}
        >
          <Text h2>Name</Text>
        </Input>
        <Spacer h={1} />
        <Text h3 my={0.5}>
          Portfolio
        </Text>
        <Select
          placeholder="Portfolio"
          onChange={(value) => setPortfolio(value)}
        >
          <Select.Option value="SRC President">SRC President</Select.Option>
          <Select.Option value="SRC General Secretary">
            SRC General Secretary
          </Select.Option>
          <Select.Option value="SRC Treasurer">SRC Treasurer</Select.Option>
        </Select>
        <Spacer h={1} />
        <Text h3 my={0.5}>
          Programme
        </Text>
        <Select
          placeholder="Programme"
          onChange={(value) => setProgramme(value)}
        >
          <Select.Option value="Mining Engineering">
            Mining Engineering
          </Select.Option>
          <Select.Option value=" Computer Science and Engineering">
            Computer Science and Engineering
          </Select.Option>
          <Select.Option value="Electrical and Electronic Engineering">
            Electrical and Electronic Engineering
          </Select.Option>
        </Select>
        <Spacer h={3} />
        <Button
          auto
          icon={<UserPlus />}
          scale={1.2}
          onClick={handleCreateCandidate}
          disabled={!Boolean(name && programme && portfolio)}
        >
          Create Candidate
        </Button>
      </form>
    </Layout>
  )
}
