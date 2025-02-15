
const Loader = () => {
  return (
    <div className={'flex justify-center'}>
      <div
        className={`flex justify-center relative animate-spin rounded-md border-4 bg-amber-950 border-amber-400`} style={{height: '75px', width: '50px'}}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black"
          style={{
            height: '45%',
            width: '45%',
            borderRadius: '50%'
          }}
        ></div>

      </div>
    </div>


  )
}
export default Loader
