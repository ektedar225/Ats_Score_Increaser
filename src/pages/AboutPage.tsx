import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Users, TrendingUp, Calendar, ArrowRight, CheckCircle, FileText, Target, Zap } from 'lucide-react';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const achievements = [
    {
      title: '500+ ATS Scores Improved',
      description: 'Successfully helped candidates achieve 90%+ ATS match rates',
      icon: <Target className="h-8 w-8 text-primary-500" />,
    },
    {
      title: 'Industry Expertise',
      description: '10+ years of experience in resume optimization',
      icon: <Award className="h-8 w-8 text-primary-500" />,
    },
    {
      title: '98% Success Rate',
      description: 'Nearly all clients see significant ATS score improvements',
      icon: <TrendingUp className="h-8 w-8 text-primary-500" />,
    },
    {
      title: 'Rapid Results',
      description: 'See improvements in your ATS score within 24 hours',
      icon: <Zap className="h-8 w-8 text-primary-500" />,
    },
  ];

  const successStories = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      improvement: "ATS Score: 45% → 95%",
      company: "Fortune 500 Tech Company",
      story: "After our optimization, Sarah's resume passed ATS screening and led to 5 interviews."
    },
    {
      name: "James Wilson",
      role: "Product Manager",
      improvement: "ATS Score: 55% → 92%",
      company: "Leading Startup",
      story: "James landed his dream job after we helped optimize his resume for ATS systems."
    },
    {
      name: "Priya Patel",
      role: "Data Scientist",
      improvement: "ATS Score: 60% → 98%",
      company: "Top AI Company",
      story: "Priya's optimized resume got her callbacks from 8 out of 10 applications."
    }
  ];

  return (
    <div className="page-transition">
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 py-20 text-white">
        <div className="container-custom">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Maximize Your <span className="text-accent-400">Resume's Potential</span>
              </h1>
              <p className="mb-8 text-lg text-gray-200">
                We've helped over 500 professionals improve their ATS scores and land their dream jobs. Our expert-led approach ensures your resume stands out to both ATS systems and hiring managers.
              </p>
              <button
                onClick={() => navigate('/subscriptions')}
                className="btn bg-accent-500 px-6 py-3 text-white hover:bg-accent-600"
              >
                Boost Your ATS Score Now
              </button>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
                alt="Resume Success"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 rounded-lg bg-white p-4 shadow-xl">
                <div className="text-primary-600">
                  <strong className="text-2xl">500+</strong>
                  <p className="text-sm">ATS Scores Improved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Success Story</h2>
            <p className="mt-4 text-xl text-gray-600">
              From startups to Fortune 500 companies, we've helped candidates succeed
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="card group hover:shadow-lg">
                <div className="mb-4 rounded-full bg-primary-50 p-3 transition-colors duration-300 group-hover:bg-primary-100">
                  {achievement.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {successStories.map((story, index) => (
              <div key={index} className="card">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">{story.name}</h3>
                  <p className="text-primary-600">{story.role}</p>
                </div>
                <p className="text-2xl font-bold text-success-600 mb-4">{story.improvement}</p>
                <p className="text-gray-600 mb-2">{story.company}</p>
                <p className="text-gray-700">{story.story}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="bg-primary-900 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Improve Your ATS Score?</h2>
            <p className="text-xl mb-8">Join hundreds of successful professionals who have boosted their career opportunities</p>
            <button
              onClick={() => navigate('/subscriptions')}
              className="btn bg-accent-500 px-8 py-4 text-lg hover:bg-accent-600"
            >
              Start Your Optimization Journey
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;