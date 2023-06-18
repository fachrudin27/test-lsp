import React from "react";

const Footers = () => {
    return(
        <div className="d-flex flex-column p-5 w-100" style={{position: "absolute", bottom: 0}}>
            <footer className="mt-auto text-center">Copyright &copy; 2023 - {(new Date().getFullYear())} GajiBaroqah</footer>
        </div>
    )
}

export default Footers