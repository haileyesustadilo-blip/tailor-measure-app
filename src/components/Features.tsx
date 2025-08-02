import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Users, Clock, Award } from "lucide-react";

const features = [
  {
    icon: Scissors,
    title: "Expert Tailoring",
    description: "Master craftsmen with decades of experience in bespoke clothing creation."
  },
  {
    icon: Users,
    title: "Personal Consultation",
    description: "One-on-one fitting sessions to ensure perfect measurements and style."
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "Committed to delivering your custom garments within promised timeframes."
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Only the finest fabrics and materials are used in our creations."
  }
];

export const Features = () => {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Our Tailoring</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We combine traditional craftsmanship with modern techniques to create 
            clothing that fits perfectly and lasts a lifetime.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center shadow-elegant hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};