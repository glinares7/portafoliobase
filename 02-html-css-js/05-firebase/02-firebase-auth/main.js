
import {auth,createUser,signinUser,signout,getTasks,popupGoogle,popupFacebook} from  './firebase-auth.js'
    // console.log('hello word');

const loggedOutLinks=document.querySelectorAll('.logged-out')
const loggedInLinks=document.querySelectorAll('.logged-in')
    const loginCheck = user =>{
    if(user) {
      loggedInLinks.forEach(link => link.style.display= 'block')
      loggedOutLinks.forEach(link => link.style.display= 'none')
    } else{
      loggedInLinks.forEach(link => link.style.display= 'none')
      loggedOutLinks.forEach(link => link.style.display= 'block')
    }   
    }
    let  myModal = new bootstrap.Modal(document.getElementById('signupModal'), {
      keyboard: false
    })
    let  myModalIn = new bootstrap.Modal(document.getElementById('signinModal'), {
      keyboard: false
    })



    // const modalIs = (modalActive) =>{
    //   let  myModal = new bootstrap.Modal(document.getElementById(modalActive), {
    //     keyboard: false
    //   })
    //   myModal.hide()
    // }

   
    //* SIGNIN
    const signupform= document.querySelector('#signup-form') 
    
 
    signupform.addEventListener('submit',(e) =>{
      e.preventDefault();
      
      const email= document.querySelector('#signup-email').value 
      const password= document.querySelector('#signup-password').value
      
  
      // console.log(signupEmail,signupPassword);
      createUser( auth,email, password)
      .then((userCredential) => {
        // Signed in
        //* clear the form
        signupform.reset()
        //*close the modal
       myModal.hide()
        
        console.log('sign up');
        //* close the form
        // const user = userCredential.user;
        // ...
      })
      // .catch((error) => {
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
      //   // ..
      // })
    })
    //* SIGNIN
    const signinForm= document.querySelector('#login-form') 
    
    signinForm.addEventListener('submit', (e) =>{
      e.preventDefault();
      
      const email= document.querySelector('#login-email').value 
      const password= document.querySelector('#login-password').value

      signinUser(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;

        signinForm.reset()
        myModalIn.hide()

        console.log('sign in');
        // ...
      })
    })

const logOut=document.querySelector('#logout')

logOut.addEventListener('click', e =>{
  signout(auth).then(() => {
    console.log('sign Out');
  })
})


//* GOOGLE LOGIN
//* https://firebase.google.com/docs/auth/web/account-linking#web-version-8
//* https://firebase.google.com/docs/auth/web/google-signin


  const googleButton= document.querySelector('#googleLogin')
  googleButton.addEventListener('click', () =>{
    // console.log('click google')
    //* mostrar unaventana adicional con google
    
  //  linkWith(auth, providerAuth).then((result) => {
    popupGoogle().then((result) => {
      console.log(result)
      console.log('google sign in')

      signinForm.reset()
      myModalIn.hide()
    }).catch((err) => {
    console.log(err);
    })

    // auth.popup(googleProvider)
    // ,then(result =>{
    //   console.log('google sign in ')
    // })
    // .catch(err =>{
    //   console.log(err)
    // })
  })

  //* FACEBOOK LOGIN
  const facebbookButton= document.querySelector('#facebookLogin')
  facebbookButton.addEventListener('click', (e) => {
    e.preventDefault()
    // console.log('facebook login')
    popupFacebook().then(result =>{
      console.log(result)
      console.log('facebook sign in')

      signinForm.reset()
      myModalIn.hide()
    })
    .catch(err =>{
      console.log(err);
    })
    
  })

//* POSTS
const postList=document.querySelector('.posts')

const setupPosts = data =>{
  if(data.length){
    let html ='';

    data.forEach(doc =>{
      const post = doc.data()
      const li = `
        <li class="list-group-item list-group-item-action">
          <h5>${post.title}</h5>
          <p>${post.description}</p>
        </li>
      `

      html += li
    })
    postList.innerHTML = html;
  }else{
    postList.innerHTML = '<p class="text-center">Login  to sea posts</p>'
  }
}

//* Events
//* listar los datos para los usuarios que esten autenticados
//* https://firebase.google.com/docs/firestore/quickstart

auth.onAuthStateChanged(async(user) =>{
  if(user){
    // console.log('Auth: sign in');
    const  querySnapshot=  await getTasks()


    // querySnapshot.forEach(doc => {
    //   // console.log(doc)
    //   const task = doc.data()
    //   // console.log(doc.id);
    //   console.log(task.description);
    // })

    setupPosts(querySnapshot.docs)
    loginCheck(user)
  }else{
    // console.log('Auth: sign out')
    setupPosts([])
    loginCheck(user)
  }
})