import { useEffect, useState } from 'react'
import {
  getBlogPosts,
  saveBlogPost,
  publishBlogPost,
  getTags,
  getCategories,
  uploadThumbnail
} from '../api/blog'

export default function BlogManager() {
  const [posts, setPosts] = useState([])
  const [tags, setTags] = useState([])
  const [categories, setCategories] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [thumbnail, setThumbnail] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const [postsData, tagsData, catData] = await Promise.all([
        getBlogPosts(),
        getTags(),
        getCategories()
      ])
      setPosts(postsData)
      setTags(tagsData)
      setCategories(catData)
    }
    fetchData()
  }, [])

  // 💾 Lưu bản nháp
  async function handleSaveDraft() {
    setLoading(true)
    try {
      let thumbUrl = null
      if (thumbnail) thumbUrl = await uploadThumbnail(thumbnail)

      await saveBlogPost({
        title,
        content,
        category_id: selectedCategory,
        tags: selectedTags,
        thumbnail_url: thumbUrl
      })

      alert('🥖 Bài viết đã được lưu bản nháp!')
      const updated = await getBlogPosts()
      setPosts(updated)
    } catch (err) {
      alert('Lỗi khi lưu: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  // 🚀 Xuất bản
  async function handlePublish(id) {
    await publishBlogPost(id)
    alert('🚀 Đã xuất bản bài viết!')
    const updated = await getBlogPosts()
    setPosts(updated)
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>🧭 Quản lý Blog</h2>

      <div style={{ background: '#f9f9f9', padding: 20, borderRadius: 10 }}>
        <h3>✏️ Tạo bài viết</h3>
        <input
          placeholder="Tiêu đề..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ width: '100%', marginBottom: 10 }}
        />
        <textarea
          placeholder="Nội dung..."
          value={content}
          onChange={e => setContent(e.target.value)}
          style={{ width: '100%', height: 100 }}
        />

        <div style={{ marginTop: 10 }}>
          <label>📂 Danh mục: </label>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: 10 }}>
          <label>🏷 Tags: </label>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {tags.map(tag => (
              <label key={tag.id} style={{ marginRight: 10 }}>
                <input
                  type="checkbox"
                  value={tag.id}
                  onChange={e => {
                    if (e.target.checked)
                      setSelectedTags(prev => [...prev, tag])
                    else
                      setSelectedTags(prev => prev.filter(t => t.id !== tag.id))
                  }}
                />
                {tag.name}
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <label>🖼 Ảnh nổi bật:</label>
          <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
        </div>

        <button
          onClick={handleSaveDraft}
          disabled={loading}
          style={{
            marginTop: 10,
            background: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: 6,
          }}
        >
          {loading ? 'Đang lưu...' : '💾 Lưu bản nháp'}
        </button>
      </div>

      <h3 style={{ marginTop: 30 }}>📋 Danh sách bài viết</h3>
      {posts.map((post) => (
        <div key={post.id} style={{
          border: '1px solid #ccc',
          borderRadius: 8,
          padding: 10,
          marginBottom: 10,
        }}>
          <h4>{post.title}</h4>
          <p>📂 {post.blog_categories?.name ?? 'Không có danh mục'}</p>
          <p>🏷 {post.tags_cache?.join(', ') ?? 'Không có tag'}</p>
          <p>📅 {post.published_at ?? 'Chưa xuất bản'}</p>
          <p>📌 Trạng thái: {post.status}</p>
          {post.status === 'draft' && (
            <button onClick={() => handlePublish(post.id)}>🚀 Xuất bản</button>
          )}
        </div>
      ))}
    </div>
  )
}
