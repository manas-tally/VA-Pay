import React from "react";

// props : {progress:0}
function ProgessBar(props) {
  return (
        <div aria-hidden='true' className='circlesContainer' style={{display:"inline-flex"}}>
            <div className='circle' style={{marginLeft:"10px",marginRight:"10px",width:"12px",height:"12px",backgroundColor:props.progress===0 ? "#29AAE2" : "white",borderRadius:"50%",border:"1px solid gray"}} />
            <div className='circle' style={{marginLeft:"10px",marginRight:"10px",width:"12px",height:"12px",backgroundColor:props.progress===1 ? "#29AAE2" : "white",borderRadius:"50%",border:"1px solid gray"}}/>
            <div className='circle' style={{marginLeft:"10px",marginRight:"10px",width:"12px",height:"12px",backgroundColor:props.progress===2 ? "#29AAE2" : "white",borderRadius:"50%",border:"1px solid gray"}} />
        </div>
  );
}

export default ProgessBar;


