import { NextPage } from "next";
import { useSession } from "next-auth/react"
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { ChangeEventHandler, useState } from "react";
import { trpc } from "../utils/trpc";

interface TextInputProps {
  id: string
  label: string
  placeholder?: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

const TextInput: React.FC<TextInputProps> = ({ id, label, placeholder, value, onChange }) => {
  return <div>
    <label htmlFor={id} className="form-label inline-block mb-2 text-gray-700">
      {label}
    </label>
    <input id={id}
      className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      />
  </div>
}

const CreateCommunity: NextPage = () => {
  const { data: session, status: sessionStatus } = useSession()
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const createCommunity = trpc.useMutation('community.create')
  const router = useRouter()
  const creatorId = session?.user?.id

  if (sessionStatus === 'loading') return <p>Loading..</p>
  if (sessionStatus === 'unauthenticated' || creatorId == null) return <Link href="/api/auth/signin">Sign in</Link>

  return <>
    <h1>Create Community</h1>
    <TextInput
      id="commmunityName"
      label="Name"
      placeholder="my_community_name"
      value={name}
      onChange={e => setName(e.target.value)}
    />
    <TextInput
      id="commmunityTitle"
      label="Title"
      placeholder="My Community Title"
      value={title}
      onChange={e => setTitle(e.target.value)}
    />
    <TextInput
      id="communityDescription"
      label="Description"
      placeholder="A community for propane and propane accessories"
      value={description}
      onChange={e => setDescription(e.target.value)}
    />
    <button onClick={async e => {
      e.preventDefault()
      const c = await createCommunity.mutateAsync({ name, title, description })
      router.push(`/c/${c.name}`)
    }}>Create</button>
  </>
}

export default CreateCommunity