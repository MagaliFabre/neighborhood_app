import React, { useEffect } from 'react';

const ChatroomWebSocket = ({ getRoomData, chatroomId, cableApp, updateApp, messages }) => {
  useEffect(() => {
    // Fetch room data on mount
    getRoomData(chatroomId);

    // Create the WebSocket subscription
    const roomSubscription = cableApp.cable.subscriptions.create(
      {
        channel: 'ChatroomsChannel',
        room: chatroomId
      },
      {
        received: (data) => {
          updateApp(data.message);
        }
      }
    );

    // Assign the subscription to the cableApp.room
    cableApp.room = roomSubscription;

    // Cleanup subscription on unmount
    return () => {
      if (cableApp.room) {
        cableApp.room.unsubscribe();
      }
    };
  }, [getRoomData, chatroomId, cableApp, updateApp]);

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>{message.content}</div>
      ))}
    </div>
  );
};

export default ChatroomWebSocket;
