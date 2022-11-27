import { ErrorComponent, Head } from 'blitz'
import { FC } from 'react'

// ------------------------------------------------------
// This page is rendered if a route match is not found
// ------------------------------------------------------
const Page404: FC = () => {
  const statusCode = 404

  const title = 'This page could n ot be found'

  return (
    <>
      <Head>
        <title>{`${statusCode}: ${title}`}</title>
      </Head>

      <ErrorComponent statusCode={statusCode} title={title} />
    </>
  )
}

export default Page404
