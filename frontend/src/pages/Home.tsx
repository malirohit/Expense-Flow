import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";

const Home = () => {
  return (
    <Layout>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-24 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Track Your Expenses Smarter
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl">
            A simple and powerful expense tracker to help you understand your
            spending habits with real-time analytics.
          </p>

          <div className="flex gap-4 mt-8">
            <Link to="/signup">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Login
              </Button>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-6 px-6 py-16 max-w-6xl mx-auto">
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="text-lg font-semibold">Expense Tracking</h3>
            <p className="text-muted-foreground mt-2">
              Add, edit, and manage your daily expenses easily.
            </p>
          </div>

          <div className="p-6 border rounded-lg bg-card">
            <h3 className="text-lg font-semibold">Analytics & Charts</h3>
            <p className="text-muted-foreground mt-2">
              Visualize your spending with category-based insights.
            </p>
          </div>

          <div className="p-6 border rounded-lg bg-card">
            <h3 className="text-lg font-semibold">Secure Access</h3>
            <p className="text-muted-foreground mt-2">
              Authentication-protected dashboard and analytics.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto border-t py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Expense Tracker. All rights reserved.
        </footer>
      </div>
    </Layout>
  );
};

export default Home;
