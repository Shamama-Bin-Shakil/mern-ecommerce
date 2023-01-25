import { useState } from "react";
import AdminContext from "./AdminContext";
const AdminState = (props) => {
    const [product, setProduct] = useState([]);

    // Get Products
    const getData = async () => {
        const URL = `${process.env.REACT_APP_HOST}/backend/api/products/get`;
        const response = await fetch(URL,{
        method: 'GET',
        }) 
        const result = await response.json();
        setProduct(result.data);
        console.log(result);
    }

  return (
    <AdminContext.Provider value={{getData, product}}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
