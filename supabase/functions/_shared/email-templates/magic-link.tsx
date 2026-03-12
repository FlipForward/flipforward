/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface MagicLinkEmailProps {
  siteName: string
  confirmationUrl: string
}

export const MagicLinkEmail = ({
  siteName,
  confirmationUrl,
}: MagicLinkEmailProps) => (
  <Html lang="nl" dir="ltr">
    <Head />
    <Preview>Je inloglink voor FlipForward</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src={logoUrl} width="140" height="auto" alt="FlipForward" style={logo} />
        <Heading style={h1}>Je inloglink</Heading>
        <Text style={text}>
          Klik op de knop hieronder om in te loggen bij FlipForward. Deze link verloopt binnenkort.
        </Text>
        <Button style={button} href={confirmationUrl}>
          Inloggen
        </Button>
        <Text style={footer}>
          Heb je deze link niet aangevraagd? Dan kun je deze e-mail negeren.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default MagicLinkEmail

const logoUrl = 'https://kioiezfvmyoxlmdhehin.supabase.co/storage/v1/object/public/email-assets/logo.svg'
const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '40px 25px', maxWidth: '480px', margin: '0 auto' }
const logo = { margin: '0 0 24px' }
const h1 = {
  fontSize: '24px',
  fontWeight: 'bold' as const,
  color: '#0F172A',
  margin: '0 0 20px',
}
const text = {
  fontSize: '15px',
  color: '#64748B',
  lineHeight: '1.6',
  margin: '0 0 28px',
}
const button = {
  backgroundColor: '#E8451C',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: '600' as const,
  borderRadius: '12px',
  padding: '14px 24px',
  textDecoration: 'none',
}
const footer = { fontSize: '12px', color: '#94a3b8', margin: '32px 0 0' }
