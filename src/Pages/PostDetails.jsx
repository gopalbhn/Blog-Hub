import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaUser, FaCalendarAlt, FaComment, FaEdit, FaTrash } from 'react-icons/fa'
import Comment from '../components/Comment';
const PostDetails = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newComment, setNewComment] = useState('');

  // Current user (replace with your authentication logic)
  const currentUser = {
    id: '123',
    name: 'Current User'
  };

  // Fetch post and comments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postResponse, commentsResponse] = await Promise.all([
          fetch(`http://localhost:3000/api/v1/posts/${postId}`),
          fetch(`http://localhost:5000/api/posts/${postId}/comments`)
        ]);

        if (!postResponse.ok) throw new Error('Failed to fetch post');
        if (!commentsResponse.ok) throw new Error('Failed to fetch comments');

        const postData = await postResponse.json();
        const commentsData = await commentsResponse.json();

        setPost(postData);
        setComments(commentsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: newComment,
          authorId: currentUser.id,
          authorName: currentUser.name
        })
      });

      if (!response.ok) throw new Error('Failed to post comment');

      const newCommentData = await response.json();
      setComments([newCommentData, ...comments]);
      setNewComment('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddReply = async (parentId, replyText) => {
    try {
      const response = await fetch(`http://localhost:5000/api/comments/${parentId}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: replyText,
          authorId: currentUser.id,
          authorName: currentUser.name
        })
      });

      if (!response.ok) throw new Error('Failed to post reply');

      const newReply = await response.json();

      setComments(prevComments => {
        const updateComments = (comments) => {
          return comments.map(comment => {
            if (comment._id === parentId) {
              return {
                ...comment,
                replies: [...(comment.replies || []), newReply]
              };
            }
            if (comment.replies) {
              return {
                ...comment,
                replies: updateComments(comment.replies)
              };
            }
            return comment;
          });
        };

        return updateComments(prevComments);
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
          method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete post');

        navigate('/posts');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  if (!post) {
    return <div className="text-center py-8">Post not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Post Header with Actions */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        {post.userId === currentUser.id && (
          <div className="flex space-x-2">
            <button
              onClick={() => navigate(`/edit-post/${postId}`)}
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
              title="Edit Post"
            >
              <FaEdit />
            </button>
            <button
              onClick={handleDeletePost}
              className="p-2 text-gray-700 hover:text-red-600 transition-colors"
              title="Delete Post"
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>

      {/* Post Meta */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <div className="flex items-center mr-4">
          <FaUser className="mr-2" />
          <span>{post.username || 'Unknown Author'}</span>
        </div>
        <div className="flex items-center">
          <FaCalendarAlt className="mr-2" />
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Categories */}
      {post.categories?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {post.categories.map((category, index) => (
            <span 
              key={index} 
              className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium"
            >
              {category}
            </span>
          ))}
        </div>
      )}

      {/* Post Content */}
      <article className="prose max-w-none mb-8">
        {post.photo && (
          <img 
            src={`http://localhost:5000/uploads/${post.photo}`} 
            alt={post.title} 
            className="w-full h-auto rounded-lg mb-6"
          />
        )}
        <p className="whitespace-pre-line">{post.content}</p>
      </article>

      {/* Comments Section */}
      <section className="border-t border-gray-200 pt-8">
        <div className="flex items-center text-lg font-semibold mb-6">
          <FaComment className="mr-2 text-blue-500" />
          <span>Comments ({comments.length})</span>
        </div>

        <form onSubmit={handleAddComment} className="mb-8">
          <div className="flex gap-3 items-start">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
              <FaUser className="text-gray-600" />
            </div>
            <div className="flex-1">
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Write your comment..."
                rows="4"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="space-y-6">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map(comment => (
              <Comment
                key={comment._id}
                comment={comment}
                currentUser={currentUser}
                onAddReply={handleAddReply}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default PostDetails;