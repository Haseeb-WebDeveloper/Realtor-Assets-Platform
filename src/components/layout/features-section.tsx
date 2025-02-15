"use client";

import { motion } from "framer-motion";
import { 
  Paintbrush, 
  ImageDown, 
  Lightbulb,
  Rocket,
  Clock,
  Shield 
} from "lucide-react";

const features = [
  {
    title: "Premium Templates",
    description: "Professionally designed templates that convert leads into clients",
    icon: Paintbrush,
  },
  {
    title: "Instant Downloads",
    description: "Get immediate access to all resources after purchase",
    icon: ImageDown,
  },
  {
    title: "Fresh Content Weekly",
    description: "New templates and resources added every week",
    icon: Lightbulb,
  },
  {
    title: "Ready to Use",
    description: "Fully customizable templates for quick deployment",
    icon: Rocket,
  },
  {
    title: "Time Saving",
    description: "Save hours on marketing material creation",
    icon: Clock,
  },
  {
    title: "Commercial License",
    description: "Use our resources for your business with confidence",
    icon: Shield,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform provides all the essential tools and resources you need to elevate 
            your real estate marketing game.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-background rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 