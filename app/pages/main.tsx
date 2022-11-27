import { BlitzPage } from 'blitz'
import React from 'react'
import { Button, Card, Page } from '@shopify/polaris'

const Main: BlitzPage = () => {
  return (
    <Page title="Example app">
      <Card sectioned>
        <Button onClick={() => alert('Button clicked!')}>Example button</Button>
      </Card>
    </Page>
  )
}

export default Main
