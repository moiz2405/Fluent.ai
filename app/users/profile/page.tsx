'use client';
import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const UserPage: React.FC = () => {
  const { user, error, isLoading } = useUser();

  // Show a loading spinner when the user data is being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span>Loading...</span>
      </div>
    );
  }

  // Show an error message if there is an error fetching user data
  if (error) {
    return (
      <div className="text-center text-red-500 mt-4">
        <span>{error.message}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6 mt-20"> {/* Added margin-top to avoid navbar overlap */}
      <div className="flex items-center space-x-6"> {/* Increased space between profile and text */}
        {/* Profile Picture */}
        {user?.picture && (
          <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg">
            <Image
              src={user.picture}
              alt="Profile Picture"
              width={96}
              height={96}
              className="object-cover rounded-full"
            />
          </div>
        )}

        {/* User Information */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">{user?.name || 'User'}</h1>
          <p className="text-gray-600">{user?.email || 'user@example.com'}</p>
        </div>
      </div>

      {/* User Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800">User Details</h2>
        <p className="mt-2 text-gray-600">
          Here you can add more user-specific details and functionalities, like preferences, past activities, or additional profile settings.
        </p>
      </div>

      {/* Logout Button */}
      <div className="mt-6 text-center">
        <Button
          onClick={() => window.location.href = '/api/auth/logout'}
          className="w-full md:w-auto bg-red-500 hover:bg-red-600 text-white"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserPage;
