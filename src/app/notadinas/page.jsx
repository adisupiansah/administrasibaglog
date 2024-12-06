import React from 'react'
import CardNotaDinas from '@/components/comp-notadinas/CardNotaDinas'
import ChartNotaDinas from '@/components/comp-notadinas/ChartNotaDinas'
import TablesNotadinas from '@/components/comp-notadinas/TablesNotadinas'

const page = () => {
  return (
    <div>
        <CardNotaDinas/>
        <TablesNotadinas/>
        {/* <ChartNotaDinas/> */}
    </div>
  )
}

export default page
