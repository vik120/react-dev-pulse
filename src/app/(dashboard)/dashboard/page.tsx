import React from 'react'

function Dashboard() {
  return (
    <>
      <div className='grid gap-3 grid-cols-3'>

        <div className="border-gray-200 bg-white p-6 block max-w-sm p-6 rounded-base shadow-xs">
          <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">Total Projects</h5>
          <p className="text-body mb-6">123</p>
        </div> 
        <div className="border-gray-200 bg-white p-6 block max-w-sm p-6 rounded-base shadow-xs">
          <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">Open errors</h5>
          <p className="text-body mb-6">123</p>
        </div> 
        <div className="border-gray-200 bg-white p-6 block max-w-sm p-6 rounded-base shadow-xs">
          <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">Unhandled promise errors</h5>
          <p className="text-body mb-6">123</p>
        </div> 
        <div className="border-gray-200 bg-white p-6 block max-w-sm p-6 rounded-base shadow-xs">
          <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">Core Web Vitals statuss</h5>
          <p className="text-body mb-6">123</p>
        </div>
        <div className="border-gray-200 bg-white p-6 block max-w-sm p-6 rounded-base shadow-xs">
          <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">Recent error logs</h5>
          <p className="text-body mb-6">123</p>
        </div>
        <div className="border-gray-200 bg-white p-6 block max-w-sm p-6 rounded-base shadow-xs">
          <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">Project health summary</h5>
          <p className="text-body mb-6">123</p>
        </div> 
      </div>
    </>
  )
}

export default Dashboard