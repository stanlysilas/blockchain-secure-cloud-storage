import { useNavigate } from 'react-router-dom'

import { Upload, LayoutDashboard, Share2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

function QuickActions () {
  const navigate = useNavigate()

  return (
    <div className='dashboard-shell'>
      <h2 className='text-2xl font-bold mb-6'>Quick Actions</h2>

      <div className='grid md:grid-cols-3 gap-4'>
        <Button variant='glass' onClick={() => navigate('/upload')}>
          <Upload className='w-4 h-4 mr-2' />
          Upload File
        </Button>

        <Button
          variant='glass'
          onClick={() => navigate('/dashboard')}
        >
          <LayoutDashboard className='w-4 h-4 mr-2' />
          Dashboard
        </Button>

        <Button variant='glass' onClick={() => navigate('/shared')}>
          <Share2 className='w-4 h-4 mr-2' />
          Shared Files
        </Button>
      </div>
    </div>
  )
}

export default QuickActions
