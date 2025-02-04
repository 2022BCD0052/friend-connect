"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Copy, Link2, LinkIcon, Plus, Video } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import { motion } from 'framer-motion'
import Loader from './Loader'

const MeetingAction = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [baseUrl, setBaseUrl] = useState("")
  const router = useRouter()
  const [generatedMeetingUrl, setGeneratedMeetingUrl] = useState("")
  const [meetingLink, setMeetingLink] = useState("")

  useEffect(() => {
    setBaseUrl(window.location.origin)
  }, [])

  const handleCreateMeetingForLater = () => {
    const roomId = uuidv4()
    const url = `${baseUrl}/video-meeting/${roomId}`
    setGeneratedMeetingUrl(url)
    setIsDialogOpen(true)
    toast.success("Meeting link created successfully!")
  }

  const handleJoinMeeting = () => {
    if (meetingLink) {
      setIsLoading(true)
      const formattedLink = meetingLink.includes("http")
        ? meetingLink
        : `${baseUrl}/video-meeting/${meetingLink}`
      router.push(formattedLink)
      toast.info('Joining meeting...')
    } else {
      toast.error('Please enter a valid link or code')
    }
  }

  const handleStartMeeting = () => {
    setIsLoading(true)
    const roomId = uuidv4()
    const meetingUrl = `${baseUrl}/video-meeting/${roomId}`
    router.push(meetingUrl)
    toast.info('Starting meeting...')
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMeetingUrl)
    toast.info('Meeting link copied to clipboard')
  }

  return (
    <>
      {isLoading && <Loader />}
      <motion.div 
        className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 p-6 bg-white/10 backdrop-blur-xl dark:bg-gray-900/50 border border-blue-400/30 shadow-lg rounded-3xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full sm:w-auto neon-blue px-6 py-3">
              <Video className='w-5 h-5 mr-2' />
              New Meeting
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="glassmorphic">
            <DropdownMenuItem onClick={handleCreateMeetingForLater}>
              <Link2 className='w-4 h-4 mr-2' />
              Create a meeting for later
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleStartMeeting}>
              <Plus className='w-4 h-4 mr-2' />
              Start an instant meeting
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className='flex w-full sm:w-auto relative'>
          <span className='absolute left-2 top-1/2 transform -translate-y-1/2'>
            <LinkIcon className='w-4 h-4 text-gray-400' />
          </span>
          <Input
            placeholder='Enter a code or link'
            className="pl-8 pr-10 rounded-r-none glass-input"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
          />
          <Button
            variant="secondary"
            className="rounded-l-none neon-pink"
            onClick={handleJoinMeeting}
          >
            Join
          </Button>
        </div>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-sm rounded-lg p-6 glassmorphic">
          <DialogHeader>
            <DialogTitle className="text-3xl font-normal text-center neon-text">
              Here's your joining link
            </DialogTitle>
          </DialogHeader>
          <div className='flex flex-col space-y-4'>
            <p className='text-sm text-gray-600 dark:text-gray-300 text-center'>
              Share this link with others. Make sure to save it for later!
            </p>
            <div className='flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded-lg'>
              <span className='text-gray-700 dark:text-gray-200 break-all'>
                {generatedMeetingUrl.slice(0, 30)}...
              </span>
              <Button variant="ghost" className="hover:bg-gray-200" onClick={copyToClipboard}>
                <Copy className='w-5 h-5 text-blue-500 neon-glow' />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        .neon-blue {
          background: #00f;
          color: white;
          box-shadow: 0 0 10px #00f;
        }
        .neon-pink {
          background: #ff007f;
          color: white;
          box-shadow: 0 0 10px #ff007f;
        }
        .neon-text {
          color: #00f;
          text-shadow: 0 0 10px #00f;
        }
        .neon-glow {
          filter: drop-shadow(0 0 5px #00f);
        }
        .glassmorphic {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          border-radius: 12px;
        }
        .glass-input {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: none;
          color: white;
        }
      `}</style>
    </>
  )
}

export default MeetingAction
