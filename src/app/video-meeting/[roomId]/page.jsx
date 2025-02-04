"use client";
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import '@/app/globals.css';
const VideoMeeting = () => {
  const params = useParams();
  const roomID = params.roomId;
  const { data: session, status } = useSession();
  const router = useRouter();
  const containerRef = useRef(null); // ref for video container element
  const [zp, setZp] = useState(null);
  const [isInMeeting, setIsInMeeting] = useState(false);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.name && containerRef.current) {
      joinMeeting(containerRef.current);
    } else {
      console.log('Session is not authenticated. Please log in before using');
    }
  }, [session, status]);

  useEffect(() => {
    return () => {
      if (zp) {
        zp.destroy();
      }
    };
  }, [zp]);

  const joinMeeting = async (element) => {
    // Generate Kit Token
    const appID = Number(process.env.NEXT_PUBLIC_ZEGOAPP_ID);
    const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;
    if (!appID || !serverSecret) {
      throw new Error('Please provide appId and secret key');
    }

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      session?.user?.id || Date.now().toString(),
      session?.user?.name || 'Guest'
    );

    // Create instance object from Kit Token.
    const zegoInstance = ZegoUIKitPrebuilt.create(kitToken);
    setZp(zegoInstance);
    // Start the call
    zegoInstance.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Join via this link',
          url: `${window.location.origin}/video-meeting/${roomID}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,
      showTurnOffRemoteCameraButton: true,
      showTurnOffRemoteMicrophoneButton: true,
      showRemoveUserButton: true,
      onJoinRoom: () => {
        toast.success('Meeting joined successfully');
        setIsInMeeting(true);
      },
      onLeaveRoom: () => {
        endMeeting();
      },
    });
  };

  const endMeeting = () => {
    if (zp) {
      zp.destroy();
    }
    toast.success('Meeting ended successfully');
    setZp(null);
    setIsInMeeting(false);
    router.push('/');
  };

  return (
    <div className="flex flex-col min-h-screen  text-white m-4 overflow-hidden">

      <div
        className={`flex-grow flex flex-col md:flex-row relative ${
          isInMeeting ? 'h-screen' : ''
        }`}
      >
      
        <div
          ref={containerRef}
          className="video-container   flex-grow rounded-3xl shadow-lg overflow-hidden "
          style={{ height: isInMeeting ? '100%' : 'calc(100vh-4rem)' }}
        >

        </div>
      </div>
      {!isInMeeting && (
        <div className="flex flex-col p-6 bg-opacity-60 backdrop-blur-xl rounded-xl mt-4 mx-6 shadow-2xl">
          <h2 className="text-4xl font-bold mb-4 text-gray-200 glow-text">Meeting Info</h2>
          <p className="mb-4 text-gray-300">Participant - {session?.user?.name || 'You'}</p>
          <Button
            onClick={endMeeting}
            className=" bg-red-500 hover:bg-red-600 text-white shadow-lg glow-button"
          >
            End Meeting
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(0,0,255,0.3),_transparent)] opacity-50 animate-pulse" />
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[url('/futuristic-overlay.svg')] bg-cover opacity-20" />
      <div className="absolute inset-0 w-full h-full bg-[url('/cyber-grid.png')] bg-center bg-cover opacity-30 animate-fadeIn" />
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_top,_rgba(255,0,150,0.2),_transparent)] opacity-50" />
            <div className="text-center text-gray-300 hover:scale-105 transform transition-all duration-300">
              <Image
                src="/images/videoQuality.jpg"
                alt="Feature 1"
                width={150}
                height={150}
                className="mx-auto mb-2 rounded-full hover:scale-110 transition-all duration-300"
              />
              <h3 className="text-xl font-semibold mb-1">HD Video Quality</h3>
              <p className="text-sm">Experience crystal clear video calls</p>
            </div>
            <div className="text-center text-gray-300 hover:scale-105 transform transition-all duration-300">
              <Image
                src="/images/screenShare.jpg"
                alt="Feature 2"
                width={150}
                height={150}
                className="mx-auto mb-2 rounded-full hover:scale-110 transition-all duration-300"
              />
              <h3 className="text-xl font-semibold mb-1">Screen Sharing</h3>
              <p className="text-sm">Easily share your screen with participants</p>
            </div>
            <div className="text-center text-gray-300 hover:scale-105 transform transition-all duration-300">
              <Image
                src="/images/videoSecure.jpg"
                alt="Feature 3"
                width={150}
                height={150}
                className="mx-auto mb-2 rounded-full hover:scale-110 transition-all duration-300"
              />
              <h3 className="text-xl font-semibold mb-1">Secure Meetings</h3>
              <p className="text-sm">Your meetings are protected and private</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoMeeting;
