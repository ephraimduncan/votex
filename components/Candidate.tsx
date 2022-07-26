import React from "react"
import { Card, Grid, Radio, Text, User } from "@geist-ui/core"

interface CandidateProps {
  name: string
  programme: string
  imageSrc?: string
}

export default function Candidate({
  name,
  programme,
  imageSrc,
}: CandidateProps) {
  return (
    <>
      <Card margin={1} marginBottom={0} width="400px">
        <User
          scale={2}
          src={imageSrc ? imageSrc : "https://unix.bio/assets/avatar.png"}
          name={name}
        >
          <Text scale={0.85}>{programme}</Text>
        </User>
      </Card>
    </>
  )
}
