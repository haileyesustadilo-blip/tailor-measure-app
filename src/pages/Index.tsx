import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { OrderForm } from "@/components/OrderForm";
import { ClothingDisplay } from "@/components/ClothingDisplay";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section id="home">
        <Hero />
      </section>
      
      {/* Features Section */}
      <section id="services">
        <Features />
      </section>
      
      {/* Clothing Collection */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Clothing Collection</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our range of premium clothing options, each crafted with precision and attention to detail.
            </p>
          </div>
          <ClothingDisplay />
        </div>
      </section>
      
      {/* Order Form Section */}
      <section id="order" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Place Your Custom Order</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to experience bespoke tailoring? Fill out the form below to begin your custom clothing journey.
            </p>
          </div>
          <div id="order-form">
            <OrderForm />
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Bespoke Tailors</h3>
          <p className="text-primary-foreground/80 mb-4">
            Crafting exceptional clothing since 1995
          </p>
          <p className="text-sm text-primary-foreground/60">
            © 2024 Bespoke Tailors. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
