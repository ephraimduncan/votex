import React from "react"
import { NextPage } from "next"
import { useTheme, Grid, Avatar, Button, Spacer } from "@geist-ui/core"
import PackageIcon from "@geist-ui/icons/package"
import FeatherIcon from "@geist-ui/icons/feather"
import GitHubIcon from "@geist-ui/icons/github"
import HomeCell from "../components/HomeCell"
import Image from "next/image"
import { Display, Key, User } from "@geist-ui/icons"

const Application: NextPage<{}> = () => {
  const theme = useTheme()

  return (
    <>
      <div className="layout">
        <div className="image">
          <Image src="/logo.jpg" width="240px" height="280px" />
        </div>
        <div className="hero">
          <h1 className="title">Votex</h1>
          <h3 className="desc">An online voting system for UMaT students.</h3>
        </div>

        <Grid.Container gap={2} justify="center">
          <Grid xs={24} md={10}>
            <HomeCell
              icon={<Key />}
              title="Secure"
              desc="Securely store your votes and vote on your own behalf."
            />
          </Grid>
          <Grid xs={24} md={10}>
            <HomeCell
              icon={<Display />}
              title="Portable"
              desc="Vote at your own convinience anytime, anywhere, with any device."
            />
          </Grid>
        </Grid.Container>
        <Spacer h={4} />

        <div className="image">
          <Button auto scale={2} icon={<User />} type="default">
            Sign In
          </Button>
        </div>
      </div>
      <style jsx>{`
        .layout {
          min-height: calc(100vh - var(--geist-page-nav-height));
          max-width: ${theme.layout.pageWidthWithMargin};
          margin: 0 auto;
          padding: 4rem;
          box-sizing: border-box;
        }
        .hero {
          height: calc(100vh - var(--geist-page-nav-height) - 300px);
          min-height: 15vh;
          max-width: 500px;
          margin: 0 auto;
          text-align: center;
          align-items: center;
          justify-content: center;
          display: flex;
          flex-direction: column;
        }
        .image {
          margin: 0 auto;
          align-items: center;
          justify-content: center;
          display: flex;
          flex-direction: column;
        }
        .title {
          font-size: 3.75rem;
          font-weight: 700;
          margin: 0;
        }
        .desc {
          color: ${theme.palette.accents_5};
          font-size: 1.5rem;
          font-weight: 500;
          margin: 0 0 ${theme.layout.gap};
        }
      `}</style>
    </>
  )
}

export default Application
