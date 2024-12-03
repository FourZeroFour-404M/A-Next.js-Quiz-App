const BenefitsTopicsInfo = [
  {
    id: 0,
    title: "Connect",
    description:
      "by build lasting relationships with fellow students and experienced tutors who are here to support your academic journey.",
    image: "/assets/images/Featured_img - Connect.jpg",
  },
  {
    id: 1,
    title: "Learn",
    description:
      "by accessing personalized learning resources and gain knowledge on subjects that matter to you, at your own pace.",
    image: "/assets/images/Featured_img - Learn.jpg",
  },
  {
    id: 2,
    title: "Have Fun",
    description:
      "by engaging in interactive sessions and enjoy learning with quizzes and challenges that make studying fun.",
    image: "/assets/images/Featured_img - Have Fun.jpg",
  },
  {
    id: 3,
    title: "Get Inspired",
    description:
      "by listening to experiences of our tutors and school alumnis who have achieved great things in their lives.",
    image: "/assets/images/Featured_img - Get Inspired.jpg",
  },
];

const Benefits = () => {
  //     const [benefitsTopicsStates, setBenefitsTopicsStates] = useState([false, false, false, false]);
  //     const [clickState, setClickState] = useState();

  //     const changeFeaturedImage = (index) => {
  //         const newState = [...benefitsTopicsStates];
  //         newState[index] = !newState[index];
  //         newState.fill(false, 0, index); //not sure if this is gonna work perfectly to the end, I hope it does 🥲
  //         setBenefitsTopicsStates(newState);
  //         setClickState(index);
  //         console.log(newState);
  // }

  return (
    <div>
      <h1 className="benefits-heading">Want to Know What the Benefits Are?</h1>
      <div className="benefits-section">
        {/* <img src={benefitsTopicsStates.includes(true)
          ? FeaturedImages[clickState].image
          : DefaultFeaturedImage} 
          alt="A Featured Pics"
        /> */}
        <img
          className="desktop-default-image"
          src="/assets/images/Featured_img_1.jpg"
          alt=""
        />
        <div className="benefits-topics">
          {BenefitsTopicsInfo.map((topic, index) => {
            return (
              // <div key={topic.id} className='connect-container' onClick={() => changeFeaturedImage(index)}>
              <div key={topic.id} className="features-container">
                <img
                  className="mobile-featured-image"
                  src={topic.image}
                  alt=""
                />
                <h2>{topic.title}</h2>
                <p>{topic.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
