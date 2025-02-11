import { getWorkSpaces } from '@/actions/workspace'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useQueryData } from '@/hooks/useQueryData'
import { Workspace } from '@/types/Workspace'
import Image from 'next/image'
import React from 'react'
import Modal from '../Modal'
import Search from '../search'
import SidebarItem from './sidebar-item'
import WorkspacePlaceholder from './workplace-placeholder'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, PlusCircle } from 'lucide-react'
import { MENU_ITEMS } from '@/constants'
import { Separator } from '@/components/ui/separator'
import { getNotifications } from '@/actions/user'
import { Notification } from '@/types/Notification'
import InfoBar from '../info-bar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import GlobalCard from '../global-card'
import { Button } from '@/components/ui/button'
import PaymentButton from '../payment-button'
import { userQueryData } from '@/hooks/userQuerydata'
import { WorkspaceProps } from '@/types/index.type'

type Props = {
  activeWorkspaceId: string;
};

const Sidebar = ({ activeWorkspaceId }: Props) => {
    const router = useRouter()
    const {data, isFetched} = userQueryData(['user-workspaces'], getWorkSpaces);

    const {data:workspace}=data as WorkspaceProps

    const onChangeActiveWorkspace = (value: string) => {
        router.push(`dashboard/${ value }`)
    }

  return (
    <div
      className="bg-[#111111] flex-none relative p-4 h-full w-[250px]flex flex-col gap-4 items-center
  overflow-hidden"
    >
      <div className="bg-[#111111] p-4 gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0">
        <Image src="/opal-logo.svg" height={40} width={40} alt="logo" />
        <p className="text-2xl">Opal</p>
      
      </div>
      <Select defaultValue={activeWorkspaceId} onValueChange={onChangeActiveWorkspace}>
        <SelectTrigger className='mt-16 text-neutral-400 bg-transparent'>
            <SelectValue placeholder="Select a workspace"></SelectValue>
        </SelectTrigger>
        <SelectContent className='bg-[#111111] backdrop-blur-xl'>
            <SelectGroup>
                <SelectLabel>Workspaces</SelectLabel>
                <Separator />
                {workspace.workspace.map((workspace) =>(<SelectItem 
                key={workspace.id} 
                value={workspace.id}
                >
                    {workspace.name}
                </SelectItem>
            ))}
               {workspace.members.length > 0 && workspace.members.map((workspace) => 
                workspace.Workspace && <SelectItem
                ></SelectItem>
               )     
            </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Sidebar;
