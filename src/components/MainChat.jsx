import React from 'react';

// Mock data to test the UI
const mockChats = [
  {
    id: '67ba67281adc420bdcfe3a68',
    name: 'Chatroom',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: 'Hey, how are you doing today?',
    timestamp: '2:30 PM',
    online: true,
  },
  {
    id: '67ba67601adc420bdcfe3a6a',
    name: 'Chatroom New',
    image: 'https://randomuser.me/api/portraits/women/45.jpg',
    lastMessage: 'Let’s catch up later!',
    timestamp: '1:15 PM',
    online: false,
  },
  {
    id: '67ba67abcadc420bdcfe3a6b',
    name: 'Project Team',
    image: 'https://randomuser.me/api/portraits/men/50.jpg',
    lastMessage: 'Deadline is approaching!',
    timestamp: '12:05 PM',
    online: true,
  },
];

export default function MainChat({ chats = mockChats }) {
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Chats</h1>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
          >
            <div className="relative">
              <img
                className="w-14 h-14 rounded-full object-cover"
                src={chat.image}
                alt={chat.name}
              />
              {chat.online && (
                <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>
            <div className="flex-1 ml-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{chat.name}</h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">{chat.timestamp}</span>
              </div>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 truncate">
                {chat.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
