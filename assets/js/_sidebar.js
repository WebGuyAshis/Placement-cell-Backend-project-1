let openSideNav = false;
let sideNavbar = document.querySelector('.employee-navbar ');
const handleSideNavbar = (e) =>{
    if(!openSideNav){
        openSideNav = true;
        sideNavbar.style.width = "250px";
    }else{
        openSideNav = false;
        sideNavbar.style.width = "0px";
    }
}