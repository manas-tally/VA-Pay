import React from "react";

// props : {text:"Submit"}
function Button(props) {
  return (
    <button tabIndex={props.tabindex} aria-label={props.ariaLabel} className='button' style={{color:"white",padding:"5px",fontWeight:"700",fontSize:"12px",backgroundColor:"#29AAE2",borderRadius:"20px",borderWidth:"0px",boxShadow:"5px 5px 5px rgba(0, 0, 0, 0.1)",width:"100%"}}>
        {props.text}
    </button>
  );
}

export default Button;


