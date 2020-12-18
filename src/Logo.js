import React from 'react';
import brain from './brain.png';  //brain is just a name
import Tilt from 'react-tilt';

const Logo = () => {
	return(
		<div className='ma4 mt0'>
            <Tilt className="Tilt br3 shadow-5" options={{max: 50}} style={{height: 150, width: 150}}>
               <div className="Tilt-inner">
                   <img style={{paddingTop: '5px'}} src={brain} alt='logo'/>
               </div>
            </Tilt>
		</div>   
		);
}

export default Logo;