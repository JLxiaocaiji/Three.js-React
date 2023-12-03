import { NavLink } from 'react-router-dom'
const NavBar = () => {
    return (
        <header className='header' >

            <NavLink to='/' className="w-10 h-10 rounded-lg bg-white items-center justify-center flex
        font-bold shadow-md">
                <p className='blue-gradient_text'>AH</p>
            </NavLink>

            <nav className='flex text-lg gap-7 font-mdedium  items-center justify-center flex
        font-bold '>

                {/* isActive 在这是一个对象，所以要 {isActive} 否则会出错？ */}
                <NavLink to='/about' className={  ({isActive}) => 
                     isActive ? "text-blue-500" : "text-red" 
                }>
                    About
                </NavLink>
                <NavLink to='/projects' className={ ({isActive}) => 
                    isActive ? "text-blue-500" : "text-black"
                }>
                    Projects
                </NavLink>
            </nav>
        </header>
    )
}

export default NavBar