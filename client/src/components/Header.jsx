import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../store/auth';

function Header() {
  const user = useSelector((state)=>state.auth.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = (e) =>{
    e.preventDefault();
    dispatch(logout());
    navigate('/');
  }
  return (
    <header className="bg-koyumavis shadow-md ">
    <title>Flash Card</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></link>
    <link href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet"></link>
    <div className='h-16 flex items-center justify-between container mx-auto '>
      <NavLink className={'font-bold text-white'} to={'/'}>Ana Sayfa</NavLink>
        <input type="text" className="block w-96 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flash Card Ara"></input>
        {user ? (
          <>
            <NavLink className={'font-bold text-white'} to={`/profile/${user._id}`}>Profil</NavLink>
            <button onClick={(e)=>handleLogout(e)} className={'font-bold text-white'}>Logout</button>
          </>
        ) : (
          <>
            <NavLink className={'font-bold text-white'} to={'/login'}>Login</NavLink>
            <NavLink className={'font-bold text-white'} to={'/register'}>Register</NavLink>
          </>
        )}
    </div>
</header>
  )
}

export default Header