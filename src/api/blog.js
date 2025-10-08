import { supabase } from '../lib/supabase'

// 🧾 Lấy danh sách bài đăng (với category & tags)
export async function getBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      blog_categories(name),
      blog_post_tags(tag_id, blog_tags(name))
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// 💾 Lưu hoặc cập nhật (upsert)
export async function saveBlogPost(post) {
  const { id, title, content, content_json, category_id, tags, thumbnail_url } = post

  const { data, error } = await supabase
    .from('blog_posts')
    .upsert({
      id,
      title,
      content,
      content_json,
      category_id,
      thumbnail_url,
      tags_cache: tags?.map(t => t.name) ?? [],
      updated_at: new Date(),
    })
    .select()
    .single()

  if (error) throw error

  // Cập nhật bảng liên kết tags
  if (data?.id && tags?.length) {
    await supabase.from('blog_post_tags').delete().eq('post_id', data.id)
    const inserts = tags.map(t => ({ post_id: data.id, tag_id: t.id }))
    await supabase.from('blog_post_tags').insert(inserts)
  }

  return data
}

// 🚀 Xuất bản bài viết
export async function publishBlogPost(id) {
  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      status: 'published',
      published_at: new Date(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

// 🏷️ Lấy tags
export async function getTags() {
  const { data, error } = await supabase.from('blog_tags').select('*')
  if (error) throw error
  return data
}

// 📂 Lấy categories
export async function getCategories() {
  const { data, error } = await supabase.from('blog_categories').select('*')
  if (error) throw error
  return data
}

// 🖼 Upload ảnh thumbnail
export async function uploadThumbnail(file) {
  const fileName = `${Date.now()}_${file.name}`
  const { error } = await supabase.storage.from('blog_thumbnails').upload(fileName, file)
  if (error) throw error

  const { data } = supabase.storage.from('blog_thumbnails').getPublicUrl(fileName)
  return data.publicUrl
}
