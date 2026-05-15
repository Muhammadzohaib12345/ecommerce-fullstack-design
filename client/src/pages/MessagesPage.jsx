import React from 'react';

const MessagesPage = () => {
  const chats = [
    { id: 1, name: 'Supplier Alpha', lastMessage: 'Your order has been processed.', time: '10:30 AM', unread: true },
    { id: 2, name: 'Customer Support', lastMessage: 'How can I help you today?', time: 'Yesterday', unread: false },
    { id: 3, name: 'Brand Store', lastMessage: 'Check out our new collection!', time: 'Monday', unread: false },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="container-x py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Messages</h1>
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-3 min-h-[500px]">
          {/* Chat List */}
          <div className="border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="divide-y divide-gray-100">
              {chats.map((chat) => (
                <div key={chat.id} className="p-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-800 text-sm">{chat.name}</h3>
                    <p className="text-xs text-gray-500 truncate max-w-[150px]">{chat.lastMessage}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{chat.time}</p>
                    {chat.unread && <span className="w-2 h-2 bg-blue-600 rounded-full inline-block"></span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2 flex flex-col justify-between">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-gray-800">Supplier Alpha</h3>
              <span className="text-xs text-green-500 font-medium">Online</span>
            </div>
            
            <div className="p-6 flex-1 space-y-4 overflow-y-auto">
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-xs text-sm">
                  Hello! Your order #12345 has been processed and is ready for shipping.
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white p-3 rounded-lg max-w-xs text-sm">
                  Great! Thank you for the update.
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex gap-2">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
