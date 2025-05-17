
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b">
        <div className="container mx-auto py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.6-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
              <circle cx="7" cy="17" r="2"></circle>
              <circle cx="17" cy="17" r="2"></circle>
            </svg>
            <span className="font-bold text-xl">DriveInsights</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Login
            </Link>
            <Button asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  <span className="text-primary">Automotive Data</span> Analytics Platform
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl max-w-[600px]">
                  Transform your driving data into actionable insights. Monitor fuel efficiency, 
                  emissions, and vehicle health all in one powerful platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" asChild>
                    <Link to="/register">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg shadow-lg p-6 relative overflow-hidden animate-fade-in">
                  <img 
                    src="/placeholder.svg" 
                    alt="Dashboard Preview" 
                    className="w-full rounded shadow-lg border border-border"
                    style={{ height: '350px', objectFit: 'cover' }}
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-background/80 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8 text-center">
                    <div className="inline-flex items-center justify-center rounded-full bg-background/90 px-4 py-1.5 text-sm font-medium">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <path d="m9 5 7 7-7 7"></path>
                      </svg>
                      Interactive Dashboard
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_70%)]"></div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our platform offers comprehensive tools to analyze and optimize your vehicle's performance
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M3 3v18h18"></path>
                    <path d="m19 9-5 5-4-4-3 3"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Real-time Dashboard</h3>
                <p className="text-muted-foreground">
                  Monitor your vehicle's performance metrics in real-time with interactive charts and visualizations.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <line x1="10" y1="9" x2="8" y2="9"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Detailed Reports</h3>
                <p className="text-muted-foreground">
                  Generate comprehensive reports with insights on fuel consumption, emissions, and more.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Smart Alerts</h3>
                <p className="text-muted-foreground">
                  Receive notifications about potential issues and maintenance requirements before they become problems.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.6-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                    <circle cx="7" cy="17" r="2"></circle>
                    <circle cx="17" cy="17" r="2"></circle>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Multi-Vehicle Support</h3>
                <p className="text-muted-foreground">
                  Monitor and manage multiple vehicles in a single, unified interface with comparative analytics.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 bg-primary/10">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to optimize your vehicle performance?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of drivers who are making data-driven decisions about their vehicles.
              </p>
              <Button size="lg" asChild>
                <Link to="/register">Get Started Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-muted py-12 border-t">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.6-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                  <circle cx="7" cy="17" r="2"></circle>
                  <circle cx="17" cy="17" r="2"></circle>
                </svg>
                <span className="font-bold text-xl">DriveInsights</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                DriveInsights is the leading automotive data analytics platform, helping drivers make informed decisions about their vehicles.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-medium mb-3">Product</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Features</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Pricing</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-muted-foreground hover:text-primary">About</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Contact</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Careers</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Terms</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Privacy</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Cookies</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} DriveInsights. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
