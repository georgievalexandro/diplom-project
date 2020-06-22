import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <div className='Footer'>
           <div className='FooterCredits'>
            Videos by <b style={{margin: '0 5px'}}>Joseph Redfield</b> and <b style={{margin: '0 5px'}}>cottonbro</b> from Pexels
           </div>
           <div className='FooterRoutes'>
               <a href='/gdpr'>Политика за поверителност</a>
           </div>
        </div>
    )
}

export default Footer
