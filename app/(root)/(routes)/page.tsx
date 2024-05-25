import { db } from '@/lib/db'
import React from 'react'
import { initialProfile } from '@/lib/initial-profile'
import { redirect } from 'next/navigation';
const Home = async () => {

  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where : {
      members : {
        some : {
          profileId : profile.id
        }
      }
    }
  });

  if(server) {
    return redirect(`/servers/${server.id}`);
  }

  return (
    <div className="">Create a Server </div>
  )
}

export default Home