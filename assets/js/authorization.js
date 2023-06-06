document.addEventListener('click',(e)=>{
    let fetchId = e.target.id;
    let fetchClass = e.target.classList.value;

    console.log("Class:", fetchClass);
    console.log('Id:', fetchId);
    
    if(fetchClass == 'signup-btn'){
        openSignUp();
    }else if(fetchClass == 'signin-btn'){
        closeSignUp();
    }
})

const signinPage = document.querySelector('.authorize-form');
const signUpPage = document.querySelector('.authorize-create')
const openSignUp = () =>{
    signinPage.style.display = 'none';
    signUpPage.style.display = 'flex';
}

const closeSignUp = ()=>{
    signUpPage.style.display = 'none';
    signinPage.style.display = 'flex';
}
