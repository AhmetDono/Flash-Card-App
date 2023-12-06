import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
  return (


<footer class="bg-koyumavis rounded-lg shadow m-4 dark:bg-gray-800">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <NavLink className={"hover:underline me-4 md:me-6"} to={'/'} >
            About
          </NavLink>
        </li>
        <li>
          <NavLink className={"hover:underline me-4 md:me-6"} to={'/'} >
          Privacy Policy
          </NavLink>
        </li>
        <li>
          <NavLink className={"hover:underline me-4 md:me-6"} to={'/'} >
          Licensing
          </NavLink>
        </li>
        <li>
          <NavLink className={"hover:underline me-4 md:me-6"} to={'/'} >
          Contact
          </NavLink>
        </li>
    </ul>
    </div>
</footer>

  )
}

export default Footer