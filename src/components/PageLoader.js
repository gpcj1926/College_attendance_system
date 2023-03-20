import React from "react";
import Loader from "./attedance_system/common/Loader";

function PageLoader(props) {
  return (
    <div>
      {!props.children && <div className="p-10 text-center"><Loader/></div>}

      {props.children && <>{props.children}</>}
    </div>
  );
}

export default PageLoader;
