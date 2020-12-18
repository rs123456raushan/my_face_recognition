import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	return(
		<div>
           <p className='f3'>
             {'This Magic Brain will detect a face in your pictures. Give it a try.'}
           </p>
          <div className='center'> 
           <div className='form center pa4 br5 shadow-5'>
            <input className='w-70 pa2 f4 center' type='text'
            onChange={onInputChange}/>
            <button className='w-30 grow link dib ph3 pv2 white bg-light-purple'
            onClick={onButtonSubmit}>Detect</button>
           </div>
          </div>  
		</div>
	);
}

export default ImageLinkForm;