import { GiCheckMark } from "react-icons/gi";
// import { FaXmark } from "react-icons/fa6";
import { FaRegCircleXmark } from "react-icons/fa6";

const tutorialPlans = [
    {
        planName: "General Plan",
        price: "Free",
        duration: "throughout",
        positiveBenefits: [
            "Access to our big-sized classes",
            "Access to all our course materials",
            "Access to all our past questions",
            'Access to special course materials',
        ],
        negativeBenefits: [
            "Access to weekly online quizzes",
            "Access to small-sized classes",
            "One-on-one access to our tutors",
            "Access to daily quizzes",
        ],
    },
    {
        planName: "Premium Plan",
        price: "₦5000",
        duration: "per month",
        positiveBenefits: [
            "Access to our big-sized classes",
            "Access to all our course materials",
            "Access to all our past questions",
            'Access to special course materials',
            "Access to weekly online quizzes",
            "Access to small-sized classes",
        ],
        negativeBenefits: [
            "One-on-one access to our tutors",
            "Access to daily quizzes",
        ],
    },
    {
        planName: "Private Plan",
        price: "₦10000",
        duration: "per month",
        positiveBenefits: [
            "Access to our big-sized classes",
            "Access to all our course materials",
            "Access to all our past questions",
            'Access to special course materials',
            "Access to weekly online quizzes",
            "Access to small-sized classes",
            "One-on-one access to our tutors",
            "Access to daily quizzes",
        ],
        negativeBenefits: [],
    },
];

const TutoringPackages = () => {
    return (
        <div className="packages" >
            <h1 className="packages-heading" > Check out our Tutoring Plans...</h1>
            < div className="packages-container" >
                {
                    tutorialPlans.map((tutorialPlan) => {
                        return (
                            <div className="plan" >
                                <h2 className="plan-name" > {tutorialPlan.planName} </h2>
                                < div className="price-info" >
                                    <h1 className="price" > {tutorialPlan.price} </h1>
                                    < p style={{ fontFamily: "SansationLight" }
                                    }>
                                        {tutorialPlan.duration}
                                    </p>
                                </div>
                                < button >
                                    <a>Subscribe </a>
                                </button>
                                < div className="price-benefits" >
                                    <div>
                                        {
                                            tutorialPlan.positiveBenefits.map((positiveBenefit) => {
                                                return (
                                                    <p>
                                                        <GiCheckMark /> {positiveBenefit}
                                                    </p>
                                                );
                                            })
                                        }
                                    </div>
                                    <div>
                                        {
                                            tutorialPlan.negativeBenefits.map((negativeBenefit) => {
                                                return (
                                                    <p>
                                                        <FaRegCircleXmark /> {negativeBenefit}
                                                    </p>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default TutoringPackages;
