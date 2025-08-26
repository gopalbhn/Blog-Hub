import React, { useState } from 'react';
import { FaUser , FaReply } from 'react-icons/fa';

const Comment = ({ comment, currentUser , onAddReply, depth = 0 }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    
    onAddReply(comment.id, replyText);
    setReplyText('');
    setIsReplying(false);
  };

  return (
    <div className={`comment mb-6 p-4 bg-gray-100 rounded-lg ${depth > 0 ? 'ml-8 border-l-2 border-gray-300' : ''}`}>
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-3">
          <FaUser  className="text-gray-600" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">{comment.author || 'Anonymous'}</span>
          <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-gray-700">{comment.text}</p>
        <button 
          className="flex items-center text-blue-500 hover:text-blue-700 text-sm mt-2"
          onClick={() => setIsReplying(!isReplying)}
        >
          <FaReply className="mr-1" />
          Reply
        </button>
      </div>

      {isReplying && (
        <form className="mt-4" onSubmit={handleReplySubmit}>
          <div className="mb-2">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button 
              type="button" 
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200"
              onClick={() => setIsReplying(false)}
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Post Reply
            </button>
          </div>
        </form>
      )}

      {comment.replies?.length > 0 && (
        <div className="mt-4">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              currentUser ={currentUser }
              onAddReply={onAddReply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;