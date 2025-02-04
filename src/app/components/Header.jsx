"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Info, LogOut, Moon, Plus, Sun, Video, X } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
    const { theme, setTheme } = useTheme();
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);

    const formatTimeDate = () => {
        const now = new Date();
        return now.toLocaleString("en-US", {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            weekday: 'short',
            month: 'short',
            day: "numeric"
        });
    };

    const userPlaceHolder = session?.user?.name?.split(" ").map((name) => name[0]).join("");

    const handlelogout = async () => {
        await signOut({ callbackUrl: '/user-auth' });
    };

    return (
        <motion.div 
            className='flex items-center justify-between p-6 ml-4 mr-4 bg-white/10 backdrop-blur-lg dark:bg-gray-900/50 border-b border-blue-500/30 shadow-lg rounded-b-3xl'
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className='flex items-center space-x-4 '>
                <Link href='/' className='flex items-center space-x-2'>
                    <Video className='w-8 h-8 text-blue-500 drop-shadow-[0_0_10px_#00f]' />
                    <span className='hidden md:block text-xl font-semibold text-gray-800 dark:text-white'>
                        Connect Friends
                    </span>
                </Link>
            </div>
            <div className='flex items-center space-x-4'>
                <span className='text-md text-gray-300 dark:text-gray-200'>{formatTimeDate()}</span>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className='p-2 rounded-full bg-gray-200 dark:bg-gray-800 shadow-md hover:shadow-blue-500/50'
                    onClick={() => setTheme(theme === 'dark' ? "light" : "dark")}
                >
                    {theme === 'dark' ? (
                        <Sun className='w-6 h-6 text-yellow-500 drop-shadow-[0_0_10px_#ff0]' />
                    ) : (
                        <Moon className='w-6 h-6 text-blue-500 drop-shadow-[0_0_10px_#00f]' />
                    )}
                </motion.button>
                <Button variant="ghost" size='icon' className="hidden md:block hover:text-blue-400">
                    <Info className='w-5 h-5' />
                </Button>

                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer border border-blue-400 shadow-lg hover:shadow-blue-600/50">
                            {session?.user?.image ? (
                                <AvatarImage src={session?.user?.image} alt={session?.user?.name} />
                            ) : (
                                <AvatarFallback className="text-lg bg-gray-300 dark:bg-gray-600">
                                    {userPlaceHolder}
                                </AvatarFallback>
                            )}
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80 p-4 bg-white/10 backdrop-blur-lg border border-blue-400/30 shadow-2xl rounded-xl">
                        <div className='flex justify-between items-center mb-2'>
                            <span className='text-sm font-bold text-gray-800 dark:text-white'>{session?.user?.email}</span>
                            <Button className="rounded-full p-4" variant="ghost" size="icon" onClick={() => setOpen(false)}>
                                <X className='h-5 w-5' />
                            </Button>
                        </div>
                        <div className='flex flex-col items-center mb-4'>
                            <Avatar className="w-20 h-20 mb-2 border border-blue-400">
                                {session?.user?.image ? (
                                    <AvatarImage src={session?.user?.image} alt={session?.user?.name} />
                                ) : (
                                    <AvatarFallback className="text-2xl dark:bg-gray-300">{userPlaceHolder}</AvatarFallback>
                                )}
                            </Avatar>
                            <h1 className='text-xl font-semibold mt-2'>Hi, {session?.user?.name}!</h1>
                        </div>
                        <div className='flex mb-4'>
                            <Button className="w-1/2 h-14 rounded-l-full border-blue-400 hover:bg-blue-500 hover:text-white" variant="outline">
                                <Plus className='h-4 w-4 mr-2' /> Add Account
                            </Button>
                            <Button className="w-1/2 h-14 rounded-r-full border-red-400 hover:bg-red-500 hover:text-white" variant="outline" onClick={handlelogout}>
                                <LogOut className='h-4 w-4 mr-2' /> Sign Out
                            </Button>
                        </div>
                        <div className='text-center text-sm text-gray-500'>
                            <Link href='#' className='hover:text-blue-400'>Privacy Policy</Link>
                            {" . "}
                            <Link href='#' className='hover:text-blue-400'>Terms of Service</Link>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </motion.div>
    );
}

export default Header;
