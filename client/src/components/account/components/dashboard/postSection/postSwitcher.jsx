import React, { useState } from 'react'
import { motion,AnimatePresence } from 'framer-motion';

import PostStepOne from './postStepOne';
import PostStepTwo from './postStepTwo';
const postSwitcher = (props) => {

    if(props.pages==1){
        return(
            <PostStepOne/>
           )
    }
    else if(props.pages==2){
        return(
            <PostStepTwo/>
            )
    }

    else {
        return(<div>Possddst switcher</div>)
    }
       
    }
 


export default postSwitcher