import React, {Component} from 'react';
import './index.css';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './Navigation';
import Signin from './Signin';
import Register from './Register';
import FaceRecognition from './FaceRecognition';
import Logo from './Logo';
import Rank from './Rank';
import ImageLinkForm from './ImageLinkForm';
import 'tachyons';

const app= new Clarifai.App({
  apiKey: '20560d93a6434ee7a1019c9bcd192678'
})

{/*const particlesOptions={
  particles: {
   number: {
     value: 30,
     density: {
        enable: true,
        value_area: 800
     }
   }
  }
}*/}

class App extends Component { 
  constructor(){
    super();
    this.state={
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) =>{
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation=(data)=>{
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputimage');
    const width=Number(image.width);
    const height=Number(image.height);
    return{
      leftCol: clarifaiFace.left_col*width,
      topRow: clarifaiFace.top_row*height,
      rightCol: width-(clarifaiFace.right_col*width),
      bottomRow: height-(clarifaiFace.bottom_row*height)
    }
  }
  displayFaceBox=(box)=>{
    this.setState({box: box});
  }

  onInputChange=(event)=>{
    this.setState({input: event.target.value});
  }

  onButtonSubmit=()=>{
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response=>{
      if(response){
        fetch('http://localhost:3000/image', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
          id: this.stateuser.id
         })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })  
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err=>console.log(err));
  }

  onRouteChange=(route)=>{
    if(route==='signout'){
       this.setState({isSignedIn: false})
    }
    else if(route==='home'){
       this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render(){
   return (
    <div className="App">
    {/*<Particles className='particles'>
       params={particlesOptions}
    </Particles>*/}
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
      {
        this.state.route==='home'?
        <div>
          <Logo/>
          <Rank/>
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>:
         ( this.state.route==='signin'?
           <Signin onRouteChange={this.onRouteChange}/>:
           <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
         )
        }
    </div>
  );
 }
}

export default App;