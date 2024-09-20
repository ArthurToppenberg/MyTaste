import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Contact: React.FC = () => {
    return (
        <div className="container text-center mt-5">
                <h1 className="mb-4 text-muted ">Contact Us</h1>
                <div className="row">
                    <div className="col-md-6">
                        <p className='lead text-muted'>
                            MyTaste is a platform dedicated to food enthusiasts.
                            Our mission is to bring together people who love to cook and share recipes.
                            Join us in our journey to explore the world of culinary delights.
                        </p>
                    </div>
                </div>
            </div>
    );
};

export default Contact;