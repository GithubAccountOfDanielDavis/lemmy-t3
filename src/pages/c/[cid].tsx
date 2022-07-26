import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import * as next from 'next'
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import { PageNotFoundError } from "next/dist/shared/lib/utils";

export const Community: NextPage<{ cid: string }> = ({cid}) => {
  const response = trpc.useQuery(['community.getOneByName', { name: cid }])
  if (response.status === 'idle' || response.status === 'loading') return <div>Loading...</div>
  if (response.status === 'error') {
    const { message, data } = response.error
    return <div>{
      ['[error]', data?.code, message]
        .filter(info => info != null)
        .join(' ')
    }</div>
  }
  const community = response.data
  return <div>
    <h1>{community.title}</h1>
    <h3>/c/{community.name}</h3>
    <p>{community.description}</p>
  </div>
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params?.cid == null) throw new PageNotFoundError('Community id is missing')
  return { props: { cid: params.cid } };
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export default Community