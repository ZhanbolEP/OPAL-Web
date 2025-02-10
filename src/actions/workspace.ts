"use server"

import { client } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
// import { sendEmail } from './user'
// import { createClient, OAuthStrategy } from '@wix/sdk'
// import { items } from '@wix/data'
// import axios from 'axios'

export const verifyAccessToWorkspace = async (workspaceId: string) => {
    try {
      const user = await currentUser()
      if (!user) return { status: 403 }
  
      const isUserInWorkspace = await client.workSpace.findUnique({
        where: {
          id: workspaceId,
          OR: [
            {
              User: {
                clerkid: user.id,
              },
            },
            {
              members: {
                every: {
                  User: {
                    clerkid: user.id,
                  },
                },
              },
            },
          ],
        },
      })
      return {
        status: 200,
        data: { workspace: isUserInWorkspace },
      }
    } catch (error) {
      return {
        status: 403,
        data: { workspace: null },
      }
    }
  }

  export const getWorkspaceFolders = (workspaceId: string) => {
    try {
      const isFolders = await client.folder.findMany({
        where:{
          workSpaceId
        },
        include:{
          _count: {
            select: {
              videos: true,

            }
          }
        }
      })
      if(isFolders && isFolders.length > 0) {
        return(status 200, data)
      }
    } catch (error) {
      
    }
  }