const Shimmer=()=>{
    return (<>
           <div className="shimmer-list">
                {
                    Array(10).fill().map((e, i) => (   <div className="shimmer-card bg-black" key={i}></div>
                        ))
                }
             
         
           </div>
    </>)
}
export default Shimmer ;