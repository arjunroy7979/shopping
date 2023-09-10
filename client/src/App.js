import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './component/Header';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { setDataProduct } from './redux/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch=useDispatch()
  const productData=useSelector((state)=>state.product)
  useEffect(() => {
    //immediate call function
    (async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`)
      const resData= await res.json()
      console.log(resData)
      dispatch(setDataProduct(resData))
    })()
  }, [])
  
  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;