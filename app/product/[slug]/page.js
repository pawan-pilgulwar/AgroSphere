import React from 'react'

const page =async ({params}) => {
  return (
  <>
    <div>My Post : {params.slug}</div>
  </>
  )
}

export default page