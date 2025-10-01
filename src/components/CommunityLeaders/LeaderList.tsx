import { useState } from 'react'
import { useCommunityLeaders } from '../../hooks/useCommunityLeaders'
import { deleteLeader } from '../../lib/communityLeadersService'
import { LeaderModal } from './LeaderModal'
import toast from 'react-hot-toast'

export const LeaderList = () => {
  const { leaders, loading, error, refetch } = useCommunityLeaders()
  const [showModal, setShowModal] = useState(false)
  const [editingLeader, setEditingLeader] = useState(null)

  if (loading) return <p>Đang tải...</p>
  if (error) return <p>Lỗi: {error}</p>

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xoá lãnh đạo này?')) return
    try {
      await deleteLeader(id)
      toast.success('Xoá thành công')
      refetch()
    } catch (err: any) {
      toast.error('Lỗi: ' + err.message)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Danh sách lãnh đạo</h1>
        <button
          className="px-3 py-1 bg-green-600 text-white rounded"
          onClick={() => {
            setEditingLeader(null)
            setShowModal(true)
          }}
        >
          + Thêm lãnh đạo
        </button>
      </div>

      <ul className="space-y-4">
        {leaders.map((leader) => (
          <li
            key={leader.id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{leader.name}</p>
              <p className="text-sm text-gray-500">{leader.title}</p>
              <p className="text-sm">{leader.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded"
                onClick={() => {
                  setEditingLeader(leader)
                  setShowModal(true)
                }}
              >
                Sửa
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded"
                onClick={() => handleDelete(leader.id)}
              >
                Xoá
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showModal && (
        <LeaderModal
          leader={editingLeader}
          onClose={() => setShowModal(false)}
          refetch={refetch}
        />
      )}
    </div>
  )
}
