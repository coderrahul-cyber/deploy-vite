import { ScaleLoader } from 'react-spinners'

function Loader() {
  return (
    <div className='w-full h-[100dvh]  bg-[#1F1E24] flex justify-center items-center'>
      <ScaleLoader  color="#6556CD" />
    </div>
  )
}

export default Loader
