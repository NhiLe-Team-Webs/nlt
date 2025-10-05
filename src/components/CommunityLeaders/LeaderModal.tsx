import { useState } from 'react'
import { addLeader, updateLeader } from '../../lib/communityLeadersService'
import toast from 'react-hot-toast'

export const LeaderModal = ({ leader, onClose, refetch }) => {
  const [name, setName] = useState(leader?.name || '')
  const [title, setTitle] = useState(leader?.title || '')
  const [description, setDescription] = useState(leader?.description || '')
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (leader) {
        await updateLeader(leader.id, { name, title, description, file })
        toast.success('Cập nhật lãnh đạo thành công!')
      } else {
        await addLeader({ name, title, description, file })
        toast.success('Thêm lãnh đạo thành công!')
      }
      refetch()
      onClose()
    } catch (err: any) {
      toast.error('Lỗi: ' + err.message)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-xl font-bold mb-4">
          {leader ? 'Sửa lãnh đạo' : 'Thêm lãnh đạo'}
        </h2>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Chức danh"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          className="mb-2"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  )
}
