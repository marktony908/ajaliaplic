import { Link } from 'react-router-dom';
import { AlertTriangle, Shield, Clock, MapPin, Users, Bell, CheckCircle, Phone } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?auto=format&fit=crop&q=80"
            alt="Emergency Response"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-8">
                <AlertTriangle className="text-red-500 w-8 h-8" />
                <span className="text-white text-2xl font-bold">Ajali!</span>
              </div>
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
                <span className="block">Report Incidents.</span>
                <span className="block text-red-500">Save Lives.</span>
              </h1>
              <p className="mt-6 text-xl text-gray-300 max-w-2xl">
                Empowering citizens to report accidents and emergencies in real-time, connecting them directly with first responders and authorities.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="px-8 py-4 text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition-all transform hover:scale-105"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 text-base font-medium rounded-lg text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
                >
                  Sign In
                </Link>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-8">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <div className="text-4xl font-bold text-white">24/7</div>
                  <div className="text-red-200 mt-2">Support</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <div className="text-4xl font-bold text-white">100+</div>
                  <div className="text-red-200 mt-2">Lives Saved</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <div className="text-4xl font-bold text-white">&lt;3m</div>
                  <div className="text-red-200 mt-2">Response Time</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="/emergency-response.png" 
                alt="Emergency Response" 
                className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Why Choose Ajali!</h2>
            <p className="mt-4 text-xl text-gray-600">Our platform is designed to make emergency reporting quick, easy, and effective.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <AlertTriangle className="h-8 w-8" />,
                title: "Quick Reporting",
                description: "Report incidents quickly and easily with our intuitive interface"
              },
              {
                icon: <MapPin className="h-8 w-8" />,
                title: "Precise Location",
                description: "Automatically capture and share accurate location information"
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "Real-time Updates",
                description: "Get instant updates on the status of your reported incidents"
              }
            ].map((feature, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-red-100 rounded-2xl transform transition-transform group-hover:scale-105" />
                <div className="relative p-8">
                  <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-red-600 text-white mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600">Simple steps to report and track incidents</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Users />, title: "Create Account", description: "Sign up for a free account" },
              { icon: <Bell />, title: "Report Incident", description: "Provide incident details" },
              { icon: <Shield />, title: "Authority Review", description: "Quick verification process" },
              { icon: <CheckCircle />, title: "Resolution", description: "Track until resolved" }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-600 text-white mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-center">{step.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-red-200 transform -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 bg-red-600">
        <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-500" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-8">Ready to make a difference?</h2>
            <p className="text-xl text-red-100 mb-12">Join us in making our communities safer.</p>
            <div className="flex justify-center gap-6">
              <Link
                to="/register"
                className="px-8 py-4 text-base font-medium rounded-lg text-red-600 bg-white hover:bg-red-50 transition-all"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 text-base font-medium rounded-lg text-white border-2 border-white hover:bg-white/10 transition-all"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Emergency Contacts</h2>
            <p className="text-xl text-gray-600 mb-8">For immediate assistance</p>
            <div className="flex justify-center gap-8">
              <div className="flex items-center bg-red-50 px-6 py-4 rounded-lg">
                <Phone className="h-8 w-8 text-red-600 mr-4" />
                <span className="text-2xl font-bold text-gray-900">999</span>
              </div>
              <div className="flex items-center bg-red-50 px-6 py-4 rounded-lg">
                <Phone className="h-8 w-8 text-red-600 mr-4" />
                <span className="text-2xl font-bold text-gray-900">112</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}