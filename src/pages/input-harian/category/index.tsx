import React from 'react'
import { useRouter } from 'next/router';
const index = () => {
  const router = useRouter();
  const { id } = router.query; 
  return (
    <div>index</div>
  )
}

export default index