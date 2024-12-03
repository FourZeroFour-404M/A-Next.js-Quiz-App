import { RiDoubleQuotesL } from 'react-icons/ri';
import { BsFacebook, BsTwitterX, BsLinkedin } from 'react-icons/bs';

const Reviews = () => {
    return (
        <div>
            <div className='review-heading'>
                <h1>Students Reviews</h1>
                <h2>What our Students are Saying...</h2>
            </div>
            <div className='reviews-container'>
                <div className='review'>
                    <RiDoubleQuotesL className='quote-sign' />
                    <p className='testimony'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione, consequuntur dolorem dignissimos velit autem, molestiae vel, aliquam provident fuga nulla quo harum error animi impedit suscipit. Assumenda reprehenderit porro suscipit.</p>
                    <img src="/assets/images/Avatar_Img.jpg" alt="A testimony giver" />
                    <div className='testimony-giver-details'>
                        <p className='testimony-giver-name'>Lance Jarvis - 200L</p>
                        <div className='testimony-giver-socials'>
                            <a><BsFacebook /></a>
                            <a><BsTwitterX /></a>
                            <a><BsLinkedin /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reviews;


// {/* <div className='review'>
//         <RiDoubleQuotesL className='quote-sign'/>
//         <p className='testimony'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione, consequuntur dolorem dignissimos velit autem, molestiae vel, aliquam provident fuga nulla quo harum error animi impedit suscipit. Assumenda reprehenderit porro suscipit.</p>
//         <img src={Avatar} alt="A testimony giver" />
//         <div className='testimony-giver-details'>
//             <p className='testimony-giver-name'>Lance Jarvis</p>
//             <div className='testimony-giver-socials'>
//                 <BsFacebook />
//                 <BsTwitterX />
//                 <BsLinkedin />
//             </div>
//         </div>
//       </div>
//       <div className='review'>
//         <RiDoubleQuotesL className='quote-sign'/>
//         <p className='testimony'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione, consequuntur dolorem dignissimos velit autem, molestiae vel, aliquam provident fuga nulla quo harum error animi impedit suscipit. Assumenda reprehenderit porro suscipit.</p>
//         <img src={Avatar} alt="A testimony giver" />
//         <div className='testimony-giver-details'>
//             <p className='testimony-giver-name'>Lance Jarvis</p>
//             <div className='testimony-giver-socials'>
//                 <BsFacebook />
//                 <BsTwitterX />
//                 <BsLinkedin />
//             </div>
//         </div>
//       </div> */}