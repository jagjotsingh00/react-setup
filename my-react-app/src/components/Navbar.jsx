import './Navbar.css'
const Navbar = () => {
    return (
        <>
        <nav className='navbar'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/960px-Microsoft_logo_%282012%29.svg.png" alt="" />
            <input type="text" placeholder='search' />
            <i class="fa fa-user"></i>
        </nav>
        </>
    )
}
export default Navbar