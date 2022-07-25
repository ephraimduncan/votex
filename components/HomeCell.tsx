import React from "react"
import { Card, Divider, Link, Text, useTheme } from "@geist-ui/core"

export type HomeCellProps = {
  title: string
  desc: string
  icon: React.ReactNode
}

const HomeCell: React.FC<HomeCellProps> = ({ title, desc, icon }) => {
  const theme = useTheme()
  return (
    <Link>
      <Card width="100%">
        <div className="title">
          <span className="icon">{icon}</span>
          <Text h3 color={theme.palette.accents_6}>
            {title}
          </Text>
        </div>
        <Divider h="1px" my={0} />
        <Card.Content>
          <Text width={20}>{desc}</Text>
        </Card.Content>
      </Card>
      <style jsx>{`
        .icon {
          margin: 0.25rem;
        }

        .icon :global(svg) {
          width: 100%;
          height: 100%;
        }

        .title {
          display: flex;
          align-items: center;
          padding-left: 1rem;
        }
      `}</style>
    </Link>
  )
}

export default HomeCell
