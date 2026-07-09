import ProfileHeader from '@/components/profile/ProfileHeader'
import ProfileStats from '@/components/profile/ProfileStats'
import WalletInfoCard from '@/components/profile/WalletInfoCard'
import SecurityCard from '@/components/profile/SecurityCard'
import QuickActions from '@/components/profile/QuickActions'

function Profile () {
  return (
    <div className='page-container'>
      <div className='dashboard-layout'>
        <div className='dashboard-wrapper'>
          <ProfileHeader />

          <ProfileStats />

          <div className='grid gap-6 lg:grid-cols-2 mt-6'>
            <WalletInfoCard />
            <SecurityCard />
          </div>

          <div className='mt-6'>
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
